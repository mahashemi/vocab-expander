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
  page.on('pageerror', error => pageErrors.push(String(error)));

  try {
    await page.goto(target, { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('#globalSearchInput', { state: 'visible', timeout: 60000 });
    const initial = await page.evaluate(() => ({
      term3DataType: typeof window.TERM3_DATA,
      dedupApplied: !!window.TERM03_DEDUP_APPLIED,
      loaderReady: typeof window.ensureTermLoaded === 'function',
      portalSummary: window.VOCAB_PORTAL_SUMMARY || null,
    }));
    if (initial.term3DataType !== 'undefined' || initial.dedupApplied) {
      throw new Error('Term 03 data was loaded on the initial portal visit; lazy loading did not hold.');
    }
    if (!initial.loaderReady || !initial.portalSummary || initial.portalSummary[3] !== 2294) {
      throw new Error('Initial portal summary or Term 03 loader is unavailable: ' + JSON.stringify(initial));
    }
    console.log('PASS: initial portal is visible without loading Term 03 data');

    await page.goto(target + '#/term/3/fa/chapter/1', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'window.TERM03_DEDUP_APPLIED === true && Array.isArray(window.TERM3_DATA) && window.TERM3_DATA.length > 2200', 'direct Term 03 deep link loads the full deduplicated vocabulary');
    await page.waitForSelector('.term-welcome', { timeout: 60000 });

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
