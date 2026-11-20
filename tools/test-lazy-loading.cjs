#!/usr/bin/env node
'use strict';

// Browser smoke tests for the lazy-loaded Term 03 payload and lesson features.
const { chromium } = require('playwright');

const target = process.env.SITE_URL || 'https://mahashemi.github.io/vocab-expander/';

async function waitFor(page, expression, label) {
  await page.waitForFunction(expression, null, { timeout: 120000 });
  console.log('PASS: ' + label);
}

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const context = await browser.newContext({ viewport: { width: 1365, height: 900 } });
  const page = await context.newPage();
  const pageErrors = [];
  const dedupAuditErrors = [];
  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('console', message => {
    if (message.type() === 'error' && message.text().includes('Term 03 deduplication audit requires attention')) {
      dedupAuditErrors.push(message.text());
    }
  });

  try {
    await page.goto(target, { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('#globalSearchInput', { state: 'visible', timeout: 60000 });
    const initial = await page.evaluate(() => ({
      term3DataType: typeof window.TERM3_DATA,
      dedupApplied: !!window.TERM03_DEDUP_APPLIED,
      loaderReady: typeof window.ensureTermLoaded === 'function',
      loadedTerms: window.getLoadedTermNumbers ? window.getLoadedTermNumbers() : null,
      portalSummary: window.VOCAB_PORTAL_SUMMARY || null,
    }));
    if (initial.term3DataType !== 'undefined' || initial.dedupApplied) {
      throw new Error('Term 03 data was loaded on the initial portal visit; lazy loading did not hold.');
    }
    if (!initial.loaderReady || !initial.portalSummary || initial.portalSummary[3] !== 2143 || !Array.isArray(initial.loadedTerms) || initial.loadedTerms.length !== 0) {
      throw new Error('Initial portal summary or Term 03 loader is unavailable: ' + JSON.stringify(initial));
    }
    console.log('PASS: initial portal is visible without loading Term 03 data');

    await page.goto(target + '#/term/1/fa', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'window.getLoadedTermNumbers().includes(1)', 'Term 01 semantic layer loads only when Term 01 is opened');

    await page.goto(target + '#/term/2/fa', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'window.getLoadedTermNumbers().includes(2)', 'Term 02 semantic layer loads only when Term 02 is opened');

    await page.goto(target + '#/term/3/fa/chapter/1', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'window.TERM03_DEDUP_APPLIED === true && Array.isArray(window.TERM3_DATA) && window.TERM3_DATA.length > 1800 && window.getLoadedTermNumbers().includes(3)', 'direct Term 03 deep link loads the full deduplicated vocabulary');
    const dedupAudit = await page.evaluate(() => window.TERM03_DEDUP_AUDIT);
    if (!dedupAudit || dedupAudit.expectedAfter !== dedupAudit.after || dedupAudit.after !== dedupAudit.actualBefore - dedupAudit.approvedMerges - dedupAudit.decisionMerges || dedupAudit.missing.length || dedupAudit.duplicateIds.length || dedupAudit.duplicateHeadwordPos.length || dedupAudit.missingSemantics.length || dedupAudit.sourceLoss.length) {
      throw new Error('Term 03 deduplication audit is inconsistent: ' + JSON.stringify(dedupAudit));
    }
    if (dedupAuditErrors.length) throw new Error('Term 03 deduplication emitted an audit error: ' + dedupAuditErrors.join(' | '));
    console.log('PASS: Term 03 dedup audit reconciles against the live pre-merge dataset (' + dedupAudit.actualBefore + ' → ' + dedupAudit.after + ')');
    if (dedupAudit.progressMigrated) throw new Error('A clean browser profile unexpectedly reported saved-progress migration.');
    await page.waitForSelector('.term-welcome', { timeout: 60000 });
    const runtimeCounts = await page.evaluate(() => window.__getRuntimeVocabCounts());
    console.log('Runtime portal vocabulary counts (custom entries excluded): ' + JSON.stringify(runtimeCounts));
    for (const term of [1, 2, 3]) {
      if (runtimeCounts[term] !== initial.portalSummary[term]) {
        throw new Error('Portal count mismatch for Term ' + term + ': summary=' + initial.portalSummary[term] + ', runtime=' + runtimeCounts[term]);
      }
    }
    console.log('PASS: portal summary counts match the loaded runtime books');

    const features = [
      ['2', 'khulasa', 'lesson', '1', 'TERM2_KHULASA'],
      ['2', 'sukhanrani', 'lesson', '1', 'TERM2_SPEECHES'],
      ['2', 'newestan', 'lesson', '1', 'NEWESTAN_WRITING_LIBRARY'],
      ['3', 'khulasa', 'lesson', '1', 'TERM3_KHULASA'],
      ['3', 'sukhanrani', 'lesson', '1', 'TERM3_SPEECHES'],
      ['3', 'newestan', 'lesson', '1', 'renderNewestanTerm3'],
    ];
    for (const [term, route, kind, lesson, globalName] of features) {
      await page.goto(target + '#/term/' + term + '/' + route + '/' + kind + '/' + lesson, { waitUntil: 'load', timeout: 120000 });
      await waitFor(page, 'typeof window[' + JSON.stringify(globalName) + '] !== "undefined"', 'Term ' + term + ' ' + route + ' feature loads on demand');
    }

    await page.goto(target, { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('#globalSearchInput', { state: 'visible', timeout: 60000 });
    await page.locator('#globalSearchInput').fill('کتاب');
    await waitFor(page, 'document.querySelectorAll(".global-search-result").length > 0', 'global search loads Term 03 and returns results');

    await page.goto(target, { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('[data-open-verbs]', { state: 'visible', timeout: 60000 });
    await page.click('[data-open-verbs]');
    await page.waitForSelector('#verbSearch', { state: 'visible', timeout: 120000 });
    console.log('PASS: Verb Treasury loads all-term data on demand');

    // Verify that a learner's saved legacy completion ID is carried to its canonical merged ID.
    const migrationContext = await browser.newContext({ viewport: { width: 1365, height: 900 } });
    const migrationPage = await migrationContext.newPage();
    await migrationPage.addInitScript(() => {
      localStorage.setItem('persian_done_v1', JSON.stringify(['3|4|KH3-04|اختراع']));
    });
    await migrationPage.goto(target + '#/term/3/fa/chapter/1', { waitUntil: 'load', timeout: 120000 });
    await waitFor(migrationPage, 'window.TERM03_DEDUP_APPLIED === true', 'Term 03 saved-progress migration runs for a returning learner');
    const migration = await migrationPage.evaluate(() => ({
      audit: window.TERM03_DEDUP_AUDIT,
      done: JSON.parse(localStorage.getItem('persian_done_v1') || '[]')
    }));
    await migrationContext.close();
    if (!migration.audit.progressMigrated || !migration.done.includes('3|17|FA3-17|اختراع') || migration.done.includes('3|4|KH3-04|اختراع')) {
      throw new Error('Term 03 saved progress was not migrated to the canonical ID: ' + JSON.stringify(migration));
    }
    console.log('PASS: legacy Term 03 completion IDs migrate to canonical merged IDs without losing progress');

    if (pageErrors.length) throw new Error('Browser page errors: ' + pageErrors.join(' | '));
    console.log('All lazy-loading browser smoke tests passed.');
  } finally {
    await context.close();
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
