#!/usr/bin/env node
'use strict';

// Build a compact, precomputed Learning School data API for GitHub Pages.
// GitHub Actions runs the existing app in Chromium, so the build reuses the
// production loaders, canonical identity rules and trilingual source data.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const crypto = require('node:crypto');
const { chromium } = require('playwright');

const target = new URL(process.env.SITE_URL || 'http://127.0.0.1:4173/');
target.searchParams.set('learning-index-build', process.env.GITHUB_RUN_ID || String(Date.now()));
const outputDir = path.resolve(__dirname, '..', 'website', 'learning', 'data');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(String(error)));

  try {
    await page.goto(target.toString(), { waitUntil: 'load', timeout: 120000 });
    await page.waitForFunction(
      () => typeof window.ensureAllTermsLoaded === 'function' && typeof window.__getAllVocabRows === 'function',
      null,
      { timeout: 60000 }
    );
    await page.evaluate(() => window.ensureAllTermsLoaded());

    await page.addScriptTag({ url: new URL('learning/identity.js', target).toString() });
    await page.addScriptTag({ url: new URL('learning/manifest.js', target).toString() });

    const serialized = await page.evaluate(() => {
      const rows = window.__getAllVocabRows();
      const built = window.VocabLearningManifest.build(rows);
      if (!built.validation.valid) {
        throw new Error('Learning identity manifest failed validation: ' + built.validation.errors.join('; '));
      }
      if (!built.aliasIndex.valid || built.aliasIndex.ambiguous.length) {
        throw new Error('Learning identity aliases are invalid or ambiguous: ' + built.aliasIndex.ambiguous.length);
      }

      const meaningsByItemId = Object.fromEntries(
        built.manifest.items.map(item => [item.itemId, {
          faMeaning: item.meanings.fa || null,
          enMeaning: item.meanings.en || null,
          arMeaning: item.meanings.ar || null
        }])
      );
      const aliases = built.aliasIndex.aliases;
      for (const row of rows) {
        const canonicalId = aliases[String(row.id)] ||
          aliases[window.VocabLearningManifest.legacyStableKey(String(row.id), String(row.fa))];
        const target = meaningsByItemId[canonicalId];
        if (!target || !row.sem) continue;
        for (const [key, value] of Object.entries(row.sem)) {
          if (Array.isArray(value)) target[key] = [...new Set([...(target[key] || []), ...value])];
          else if ((target[key] === null || target[key] === undefined || target[key] === '') && value) target[key] = value;
        }
      }
      const coreFields = [
        'id', 'bk', 'ch', 'units', 'fa', 'tr', 'en', 'pos', 'source', 'sources',
        'xf', 'xt', 'xe', 'nt', 'extraExamples', 'extraNotes', 'acceptedForms',
        'aliases', 'variants', 'synonyms', 'ms', 'amr', 'm', 'a', 'note'
      ];
      const coreRows = rows.map(row => {
        const canonicalId = aliases[String(row.id)] ||
          aliases[window.VocabLearningManifest.legacyStableKey(String(row.id), String(row.fa))];
        const meanings = meaningsByItemId[canonicalId] || {};
        const core = {};
        for (const field of coreFields) {
          const value = field === 'en' ? (row.en || meanings.enMeaning || '') : row[field];
          if (value === undefined || value === null || value === '') continue;
          if (Array.isArray(value) && !value.length) continue;
          core[field] = value;
        }
        core.canonicalId = canonicalId;
        return core;
      });
      if (coreRows.some(row => !row.canonicalId)) {
        throw new Error('The quick-start index contains a row without a canonical learning identity');
      }
      const allItemRefs = coreRows.map(row => ({
        id: row.id, bk: row.bk, ch: row.ch, fa: row.fa, en: row.en,
        canonicalId: row.canonicalId,
        legacyKey: window.VocabLearningManifest.legacyStableKey(String(row.id), String(row.fa))
      }));
      const selectedCanonicalIds = new Set();
      for (const term of [1, 2, 3]) {
        const candidates = coreRows.filter(row => Number(row.bk) === term && row.fa && row.en);
        const byChapter = new Map();
        for (const row of candidates) {
          const chapter = String(row.ch || 0);
          if (!byChapter.has(chapter)) byChapter.set(chapter, []);
          byChapter.get(chapter).push(row);
        }
        const chapters = [...byChapter.entries()].sort((a, b) => Number(a[0]) - Number(b[0])).map(([, values]) =>
          values.sort((a, b) => String(a.id).localeCompare(String(b.id)))
        );
        const selectedForTerm = new Set();
        let offset = 0;
        while (selectedForTerm.size < 150 && chapters.some(group => offset < group.length)) {
          for (const group of chapters) {
            const row = group[offset];
            if (row && !selectedForTerm.has(row.canonicalId)) {
              selectedForTerm.add(row.canonicalId);
              selectedCanonicalIds.add(row.canonicalId);
              if (selectedForTerm.size >= 150) break;
            }
          }
          offset++;
        }
      }
      const firstRows = coreRows.filter(row => selectedCanonicalIds.has(row.canonicalId));
      const generatedAt = new Date().toISOString();
      const core = {
        schemaVersion: 1,
        generatedAt,
        rows: coreRows,
        aliasIndex: built.aliasIndex,
        stats: built.stats
      };
      const first = {
        schemaVersion: 1,
        generatedAt,
        rows: firstRows,
        allItemRefs,
        stats: built.stats,
        quickStartItems: selectedCanonicalIds.size,
        quickStartRows: firstRows.length,
        quickStartTermCounts: firstRows.reduce((counts, row) => { counts[row.bk] = (counts[row.bk] || 0) + 1; return counts; }, {})
      };
      const meanings = {
        schemaVersion: 1,
        generatedAt,
        byItemId: meaningsByItemId
      };
      return JSON.stringify({ core, first, meanings });
    });

    const payload = JSON.parse(serialized);
    payload.core.sourceCommit = process.env.GITHUB_SHA || null;
    payload.first.sourceCommit = payload.core.sourceCommit;
    fs.mkdirSync(outputDir, { recursive: true });
    const coreText = JSON.stringify(payload.core);
    const firstText = JSON.stringify(payload.first);
    const meaningsText = JSON.stringify(payload.meanings);
    const hash = value => crypto.createHash('sha256').update(value).digest('hex').slice(0, 16);
    const coreFile = 'learning-school-core.' + hash(coreText) + '.json';
    const firstFile = 'learning-school-first.' + hash(firstText) + '.json';
    const meaningsFile = 'learning-school-meanings.' + hash(meaningsText) + '.json';
    const coreGzipFile = coreFile + '.gz';
    const firstGzipFile = firstFile + '.gz';
    const meaningsGzipFile = meaningsFile + '.gz';
    for (const name of fs.readdirSync(outputDir)) {
      if (/^learning-school-(?:first|core|meanings)\.[a-f0-9]{16}\.json(?:\.gz)?$/.test(name)) fs.unlinkSync(path.join(outputDir, name));
    }
    fs.writeFileSync(path.join(outputDir, coreFile), coreText + '\n');
    fs.writeFileSync(path.join(outputDir, coreGzipFile), zlib.gzipSync(coreText));
    fs.writeFileSync(path.join(outputDir, firstFile), firstText + '\n');
    fs.writeFileSync(path.join(outputDir, firstGzipFile), zlib.gzipSync(firstText));
    fs.writeFileSync(path.join(outputDir, meaningsFile), meaningsText + '\n');
    fs.writeFileSync(path.join(outputDir, meaningsGzipFile), zlib.gzipSync(meaningsText));
    const index = {
      schemaVersion: 1,
      generatedAt: payload.core.generatedAt,
      sourceCommit: payload.core.sourceCommit,
      firstUrl: 'learning/data/' + firstFile,
      firstGzipUrl: 'learning/data/' + firstGzipFile,
      coreUrl: 'learning/data/' + coreFile,
      coreGzipUrl: 'learning/data/' + coreGzipFile,
      meaningsUrl: 'learning/data/' + meaningsFile,
      meaningsGzipUrl: 'learning/data/' + meaningsGzipFile
    };
    fs.writeFileSync(path.join(outputDir, 'learning-school-index.json'), JSON.stringify(index) + '\n');

    const bytes = value => Buffer.byteLength(value);
    const gzipBytes = value => zlib.gzipSync(value).length;
    const summary = {
      rows: payload.core.rows.length,
      indexedItems: payload.core.stats.indexedItems,
      occurrences: payload.core.stats.occurrences,
      crossTermMerged: payload.core.stats.crossTermMerged,
      coreBytes: bytes(coreText),
      coreGzipBytes: gzipBytes(coreText),
      quickStartRows: payload.first.rows.length,
      quickStartItems: payload.first.quickStartItems,
      quickStartBytes: bytes(firstText),
      quickStartGzipBytes: gzipBytes(firstText),
      meaningsBytes: bytes(meaningsText),
      meaningsGzipBytes: gzipBytes(meaningsText),
      firstFile,
      firstGzipFile,
      coreFile,
      coreGzipFile,
      meaningsFile,
      meaningsGzipFile
    };
    if (summary.rows < 3000 || summary.indexedItems < 2500) {
      throw new Error('Generated Learning School index is unexpectedly incomplete: ' + JSON.stringify(summary));
    }
    if (pageErrors.length) throw new Error('Browser errors during static index generation: ' + pageErrors.join(' | '));
    console.log('Generated static Learning School data: ' + JSON.stringify(summary));
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
