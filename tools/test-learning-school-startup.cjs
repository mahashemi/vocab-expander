#!/usr/bin/env node
'use strict';

// Focused cold-start regression test for the cross-term Learning School.
const { chromium } = require('playwright');

const base = new URL(process.env.SITE_URL || 'http://127.0.0.1:4173/');
base.searchParams.set('learning-school-test', process.env.GITHUB_RUN_ID || String(Date.now()));
base.hash = '#/learning';

async function waitFor(page, expression, label, timeout = 60000) {
  await page.waitForFunction(expression, null, { timeout });
  console.log('PASS: ' + label);
}

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));

  try {
    await page.goto(base.toString(), { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('.learning-question #learningAnswer', { timeout: 90000 });

    const startup = await page.evaluate(() => ({
      coreReady: performance.getEntriesByName('vocab-learning-school-core-ready')[0]?.startTime ?? null,
      firstExercise: performance.getEntriesByName('vocab-learning-school-first-exercise')[0]?.startTime ?? null,
      dataReady: performance.getEntriesByName('vocab-learning-school-data-ready')[0]?.startTime ?? null,
      loadedTerms: window.getLoadedTermNumbers?.() || [],
      rows: window.LEARNING_SCHOOL_DATA?.rows?.length || 0,
      termCounts: (window.LEARNING_SCHOOL_DATA?.rows || []).reduce((counts, row) => { counts[row.bk] = (counts[row.bk] || 0) + 1; return counts; }, {}),
      semanticFlags: [window.TERM01_SEMANTICS_READY, window.TERM02_SEMANTICS_READY, window.TERM03_SEMANTICS_READY],
      semanticRequests: performance.getEntriesByType('resource')
        .filter(entry => /learning-school-meanings|semantic-meanings|term01-semantic|term02-(?:core|additional)-semantics|term03-additional-semantics/.test(entry.name))
        .map(entry => new URL(entry.name).pathname.split('/').pop())
    }));

    if (startup.dataReady == null || startup.coreReady == null || startup.firstExercise == null || startup.firstExercise < startup.coreReady) {
      throw new Error('The first exercise did not follow Learning School core readiness: ' + JSON.stringify(startup));
    }
    if (startup.loadedTerms.length !== 0 || startup.rows < 3000 || ![1, 2, 3].every(term => startup.termCounts[term] > 0)) {
      throw new Error('The cross-term core vocabulary is incomplete: ' + JSON.stringify(startup));
    }
    if (startup.semanticFlags.some(Boolean) || startup.semanticRequests.length) {
      throw new Error('Optional semantic bundles loaded before the first exercise: ' + JSON.stringify(startup));
    }
    console.log('Learning School timing: core ready ' + Math.round(startup.coreReady) + ' ms; first exercise ' + Math.round(startup.firstExercise) + ' ms; queue/render after core ' + Math.max(0, Math.round(startup.firstExercise - startup.coreReady)) + ' ms');
    console.log('PASS: first exercise appears from the static three-term index without loading any full term bundles or optional meanings');

    await page.locator('[data-mode="meaning-recall"]').click();
    await waitFor(page, 'window.LEARNING_SCHOOL_SEMANTICS_READY === true', 'Meaning Recall loads the complete trilingual semantic layer');
    const coverage = await page.evaluate(() => {
      const rows = window.LEARNING_SCHOOL_DATA.rows;
      return {
        english: rows.filter(item => item.bk === 3 && window.VocabMeaningRecall.eligible(item, { language: 'en' })).length,
        arabic: rows.filter(item => item.bk === 3 && window.VocabMeaningRecall.eligible(item, { language: 'ar' })).length
      };
    });
    if (coverage.english < 100 || coverage.arabic < 100) {
      throw new Error('Meaning Recall coverage regressed after lazy semantic loading: ' + JSON.stringify(coverage));
    }
    console.log('PASS: English and Arabic Meaning Recall retain reviewed Term 03 coverage (' + coverage.english + ' / ' + coverage.arabic + ')');
    const meaningLoadState = await page.evaluate(() => ({
      loadedTerms: window.getLoadedTermNumbers?.() || [],
      termSemanticFlags: [window.TERM01_SEMANTICS_READY, window.TERM02_SEMANTICS_READY, window.TERM03_SEMANTICS_READY]
    }));
    if (meaningLoadState.loadedTerms.length || meaningLoadState.termSemanticFlags.some(Boolean)) {
      throw new Error('Learning School Meaning Recall should not load the full term bundles: ' + JSON.stringify(meaningLoadState));
    }
    console.log('PASS: trilingual Meaning Recall uses its own static data without loading full term bundles');

    await page.locator('[data-mode="imla"]').click();
    await page.waitForSelector('.learning-question #learningAnswer', { timeout: 10000 });
    await page.locator('[data-mode="skip-gram"]').click();
    await page.waitForSelector('.learning-question #learningAnswer', { timeout: 10000 });
    console.log('PASS: Imla and Skip-gram remain available after semantic enrichment');

    // Measure the same click-to-first-exercise path on a mobile viewport
    // with the same 3G-like network and 4x CPU throttling used by the site baseline.
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      serviceWorkers: 'block'
    });
    const mobilePage = await mobileContext.newPage();
    mobilePage.on('pageerror', error => errors.push('mobile: ' + String(error)));
    const mobileBase = new URL(base.toString());
    mobileBase.searchParams.set('learning-school-test', 'mobile-' + (process.env.GITHUB_RUN_ID || 'local'));
    const mobileCdp = await mobileContext.newCDPSession(mobilePage);
    await mobileCdp.send('Network.enable');
    await mobileCdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: 200 * 1024,
      uploadThroughput: 75 * 1024,
      connectionType: 'cellular3g'
    });
    await mobileCdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await mobileCdp.send('Network.clearBrowserCache');
    await mobilePage.goto(mobileBase.toString(), { waitUntil: 'load', timeout: 120000 });
    await mobilePage.waitForSelector('.learning-question #learningAnswer', { timeout: 90000 });
    const mobileStartup = await mobilePage.evaluate(() => ({
      dataReady: performance.getEntriesByName('vocab-learning-school-data-ready')[0]?.startTime ?? null,
      coreReady: performance.getEntriesByName('vocab-learning-school-core-ready')[0]?.startTime ?? null,
      firstExercise: performance.getEntriesByName('vocab-learning-school-first-exercise')[0]?.startTime ?? null,
      loadedTerms: window.getLoadedTermNumbers?.() || [],
      rows: window.LEARNING_SCHOOL_DATA?.rows?.length || 0,
      semanticFlags: [window.TERM01_SEMANTICS_READY, window.TERM02_SEMANTICS_READY, window.TERM03_SEMANTICS_READY],
      semanticRequests: performance.getEntriesByType('resource')
        .filter(entry => /learning-school-meanings|semantic-meanings|term01-semantic|term02-(?:core|additional)-semantics|term03-additional-semantics/.test(entry.name))
        .map(entry => new URL(entry.name).pathname.split('/').pop())
    }));
    if (mobileStartup.dataReady == null || mobileStartup.coreReady == null || mobileStartup.firstExercise == null || mobileStartup.firstExercise < mobileStartup.coreReady) {
      throw new Error('Mobile first exercise did not follow Learning School core readiness: ' + JSON.stringify(mobileStartup));
    }
    if (mobileStartup.loadedTerms.length !== 0 || mobileStartup.rows < 3000 || mobileStartup.semanticFlags.some(Boolean) || mobileStartup.semanticRequests.length) {
      throw new Error('Mobile Learning School loaded optional semantics before the first exercise: ' + JSON.stringify(mobileStartup));
    }
    console.log('Learning School mobile 3G/4x timing: core ready ' + Math.round(mobileStartup.coreReady) + ' ms; first exercise ' + Math.round(mobileStartup.firstExercise) + ' ms; queue/render after core ' + Math.max(0, Math.round(mobileStartup.firstExercise - mobileStartup.coreReady)) + ' ms');
    console.log('PASS: mobile first exercise appears from the static index without full term or semantic bundles');
    await mobileCdp.detach();
    await mobileContext.close();

    if (errors.length) throw new Error('Browser page errors: ' + errors.join(' | '));
    console.log('Learning School desktop and mobile cold-start browser tests passed.');
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
