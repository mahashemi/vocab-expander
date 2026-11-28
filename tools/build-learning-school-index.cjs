#!/usr/bin/env node
'use strict';

// Build a compact, precomputed Learning School data API for GitHub Pages.
// GitHub Actions runs the existing app in Chromium, so the build reuses the
// production loaders, canonical identity rules and trilingual source data.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
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
          fa: item.meanings.fa || null,
          en: item.meanings.en || null,
          ar: item.meanings.ar || null
        }])
      );
      const aliases = built.aliasIndex.aliases;
      const coreRows = rows.map(row => {
        const canonicalId = aliases[String(row.id)] ||
          aliases[window.VocabLearningManifest.legacyStableKey(String(row.id), String(row.fa))];
        const meanings = meaningsByItemId[canonicalId] || {};
        const { sem, ...core } = row;
        // Imla uses English clues; keep that one field in the small core payload.
        core.en = core.en || meanings.en || '';
        return core;
      });
      // Stable IDs and aliases are precomputed using the full trilingual meanings.
      // The meaning text itself is kept in a separate file, loaded only for Meaning Recall.
      const manifest = {
        schemaVersion: built.manifest.schemaVersion,
        items: built.manifest.items.map(({ meanings, ...item }) => item)
      };
      const core = {
        schemaVersion: 1,
        generatedAt: new Date().toISOString(),
        rows: coreRows,
        manifest,
        aliasIndex: built.aliasIndex,
        stats: built.stats
      };
      const meanings = {
        schemaVersion: 1,
        generatedAt: core.generatedAt,
        byItemId: meaningsByItemId
      };
      return JSON.stringify({ core, meanings });
    });

    const payload = JSON.parse(serialized);
    payload.core.sourceCommit = process.env.GITHUB_SHA || null;
    fs.mkdirSync(outputDir, { recursive: true });
    const coreText = JSON.stringify(payload.core);
    const meaningsText = JSON.stringify(payload.meanings);
    fs.writeFileSync(path.join(outputDir, 'learning-school-core.json'), coreText + '\n');
    fs.writeFileSync(path.join(outputDir, 'learning-school-meanings.json'), meaningsText + '\n');

    const bytes = value => Buffer.byteLength(value);
    const gzipBytes = value => zlib.gzipSync(value).length;
    const summary = {
      rows: payload.core.rows.length,
      indexedItems: payload.core.stats.indexedItems,
      occurrences: payload.core.stats.occurrences,
      crossTermMerged: payload.core.stats.crossTermMerged,
      coreBytes: bytes(coreText),
      coreGzipBytes: gzipBytes(coreText),
      meaningsBytes: bytes(meaningsText),
      meaningsGzipBytes: gzipBytes(meaningsText)
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
