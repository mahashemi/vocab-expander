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
      loadedTerms: window.getLoadedTermNumbers?.() || [],
      rows: window.__getAllVocabRows?.().length || 0,
      semanticFlags: [window.TERM01_SEMANTICS_READY, window.TERM02_SEMANTICS_READY, window.TERM03_SEMANTICS_READY],
      semanticRequests: performance.getEntriesByType('resource')
        .filter(entry => /semantic-meanings|term01-semantic|term02-(?:core|additional)-semantics|term03-additional-semantics/.test(entry.name))
        .map(entry => new URL(entry.name).pathname.split('/').pop())
    }));

    if (startup.coreReady == null || startup.firstExercise == null || startup.firstExercise < startup.coreReady) {
      throw new Error('The first exercise did not follow Learning School core readiness: ' + JSON.stringify(startup));
    }
    if (startup.loadedTerms.length !== 3 || startup.rows < 3000) {
      throw new Error('The cross-term core vocabulary is incomplete: ' + JSON.stringify(startup));
    }
    if (startup.semanticFlags.some(Boolean) || startup.semanticRequests.length) {
      throw new Error('Optional semantic bundles loaded before the first exercise: ' + JSON.stringify(startup));
    }
    console.log('Learning School timing: core ready ' + Math.round(startup.coreReady) + ' ms; first exercise ' + Math.round(startup.firstExercise) + ' ms; queue/render after core ' + Math.max(0, Math.round(startup.firstExercise - startup.coreReady)) + ' ms');
    console.log('PASS: first exercise appears with all three core terms and without optional semantic bundles');

    await page.locator('[data-mode="meaning-recall"]').click();
    await waitFor(page, 'window.LEARNING_SCHOOL_SEMANTICS_READY === true && window.TERM01_SEMANTICS_READY === true && window.TERM02_SEMANTICS_READY === true && window.TERM03_SEMANTICS_READY === true', 'Meaning Recall loads the complete trilingual semantic layer');
    const coverage = await page.evaluate(() => {
      const rows = window.__getAllVocabRows();
      return {
        english: rows.filter(item => item.bk === 3 && window.VocabMeaningRecall.eligible(item, { language: 'en' })).length,
        arabic: rows.filter(item => item.bk === 3 && window.VocabMeaningRecall.eligible(item, { language: 'ar' })).length
      };
    });
    if (coverage.english < 100 || coverage.arabic < 100) {
      throw new Error('Meaning Recall coverage regressed after lazy semantic loading: ' + JSON.stringify(coverage));
    }
    console.log('PASS: English and Arabic Meaning Recall retain reviewed Term 03 coverage (' + coverage.english + ' / ' + coverage.arabic + ')');

    await page.locator('[data-mode="imla"]').click();
    await page.waitForSelector('.learning-question #learningAnswer', { timeout: 10000 });
    await page.locator('[data-mode="skip-gram"]').click();
    await page.waitForSelector('.learning-question #learningAnswer', { timeout: 10000 });
    console.log('PASS: Imla and Skip-gram remain available after semantic enrichment');

    if (errors.length) throw new Error('Browser page errors: ' + errors.join(' | '));
    console.log('Learning School cold-start browser test passed.');
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
