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
      term1DataType: typeof window.TERM1_DATA,
      term2DataType: typeof window.TERM2_DATA,
      term3DataType: typeof window.TERM3_DATA,
      dedupApplied: !!window.TERM03_DEDUP_APPLIED,
      loaderReady: typeof window.ensureTermLoaded === 'function',
      loadedTerms: window.getLoadedTermNumbers ? window.getLoadedTermNumbers() : null,
      portalSummary: window.VOCAB_PORTAL_SUMMARY || null,
    }));
    if (initial.term1DataType !== 'undefined' || initial.term2DataType !== 'undefined' || initial.term3DataType !== 'undefined' || initial.dedupApplied) {
      throw new Error('Term 03 data was loaded on the initial portal visit; lazy loading did not hold.');
    }
    if (!initial.loaderReady || !initial.portalSummary || initial.portalSummary[3] !== 2161 || !Array.isArray(initial.loadedTerms) || initial.loadedTerms.length !== 0) {
      throw new Error('Initial portal summary or Term 03 loader is unavailable: ' + JSON.stringify(initial));
    }
    console.log('PASS: initial portal is visible without loading Term 03 data');

    await page.goto(target + '#/term/1/fa', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'window.getLoadedTermNumbers().includes(1) && Array.isArray(window.TERM1_DATA) && window.TERM1_DATA.length > 0 && Array.isArray(window.TERM2_DATA) && window.TERM2_DATA.length > 0', 'Term 01/02 core data and Term 01 semantics load on first term entry');
    const firstTermCounts = await page.evaluate(() => window.__getRuntimeVocabCounts());
    if (firstTermCounts[1] !== initial.portalSummary[1] || firstTermCounts[2] !== initial.portalSummary[2]) {
      throw new Error('Deferred Term 01/02 core counts do not match the portal manifest: ' + JSON.stringify(firstTermCounts));
    }
    console.log('PASS: deferred Term 01/02 data reconciles to the portal manifest');

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
      ['1', 'newestan', 'lesson', '1', 'renderNewestanTerm1'],
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

    await page.goto(target + '#/term/1/newestan/lesson/1', { waitUntil: 'load', timeout: 120000 });
    if (!await page.locator('#termTabs [data-t="essays"]').isVisible()) throw new Error('Term 01 Newestan tab is not visible.');
    await waitFor(page, 'document.querySelectorAll(".newestan-rubric-score").length === 4', 'Term 01 Newestan source rubric is visible');
    await page.locator('.newestan-rubric-score').first().selectOption('4');
    let rubricState = await page.evaluate(() => JSON.parse(localStorage.getItem('newestan-writing-rubric-scores-v1') || '{}'));
    if (rubricState['t1-1']?.content !== 4) throw new Error('Term 01 rubric self-score was not saved: ' + JSON.stringify(rubricState));
    await page.reload({ waitUntil: 'load' });
    await waitFor(page, 'document.querySelector(".newestan-rubric-score")?.value === "4"', 'Term 01 rubric score persists after refresh');

    await page.goto(target + '#/term/2/newestan/lesson/1', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'typeof window.renderNewestanTerm1 === "function" && document.querySelector(".newestan-workshop")', 'Term 02 Newestan workshop opens');
    if (await page.locator('.newestan-rubric').count()) throw new Error('A 20-point rubric was invented for Term 02 despite no such rubric in the reviewed OCR pages.');

    await page.goto(target + '#/term/3/newestan/lesson/2', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'window.__vocabRouteLesson === 2 && document.querySelector("#newestanLesson")?.value === "2"', 'Term 03 URL lesson overrides the previous term lesson selector');
    await waitFor(page, 'document.querySelectorAll(".newestan-rubric-score").length === 4', 'Term 03 source rubric is visible');
    await page.locator('.newestan-rubric-score').first().selectOption('5');
    const term3RubricTarget = await page.locator('.newestan-rubric').evaluate(root => ({
      key: 't' + root.dataset.rubricTerm + '-' + root.dataset.rubricLesson,
      criterion: root.querySelector('.newestan-rubric-score')?.dataset.rubricKey
    }));
    rubricState = await page.evaluate(() => JSON.parse(localStorage.getItem('newestan-writing-rubric-scores-v1') || '{}'));
    if (rubricState[term3RubricTarget.key]?.[term3RubricTarget.criterion] !== 5) {
      throw new Error('Term 03 rubric self-score was not saved for the rendered lesson/criterion: ' + JSON.stringify({target: term3RubricTarget, state: rubricState}));
    }
    console.log('PASS: Term 01/03 rubric self-assessment persists; Term 02 correctly has no invented rubric');

    await page.goto(target, { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('#globalSearchInput', { state: 'visible', timeout: 60000 });
    await page.locator('#globalSearchInput').fill('کتاب');
    await waitFor(page, 'document.querySelectorAll(".global-search-result").length > 0', 'global search loads Term 03 and returns results');

    await page.goto(target, { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('[data-open-verbs]', { state: 'visible', timeout: 60000 });
    await page.click('[data-open-verbs]');
    await page.waitForSelector('#verbSearch', { state: 'visible', timeout: 120000 });
    console.log('PASS: Verb Treasury loads all-term data on demand');

    await page.goto(target + '#/learning', { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('.learning-school', { timeout: 120000 });
    await waitFor(page, 'typeof window.VocabImla?.validate === "function" && typeof window.VocabSkipGram?.validate === "function" && typeof window.VocabReviewScheduler?.evaluate === "function" && typeof window.__getAllVocabRows === "function"', 'Learning School and independent Imla/Skip-gram modules load on demand');
    const manifestStatus = await page.evaluate(() => {
      const built = window.VocabLearningManifest.build(window.__getAllVocabRows());
      return {valid: built.validation.valid, errors: built.validation.errors, count: built.stats.indexedItems, ambiguous: built.stats.ambiguousAliases};
    });
    if (!manifestStatus.valid || manifestStatus.count < 3000 || manifestStatus.ambiguous !== 0) {
      throw new Error('Canonical source identity manifest is invalid or incomplete: ' + JSON.stringify(manifestStatus));
    }
    console.log('PASS: canonical manifest indexes all term records with no ambiguous legacy IDs (' + manifestStatus.count + ')');
    await page.locator('#learningTerm').selectOption('1');
    const imlaTarget = await page.evaluate(() => window.__getAllVocabRows().find(item => item.bk === 1 && window.VocabImla.eligible(item))?.fa);
    if (!imlaTarget) throw new Error('No eligible Term 01 Imla sample was found.');
    await page.locator('#learningAnswer').fill(imlaTarget);
    await page.locator('#learningCheck').click();
    await page.waitForSelector('.learning-feedback.correct', { timeout: 10000 });
    console.log('PASS: Imla accepts a source-backed Term 01 vocabulary answer');

    await page.locator('[data-mode="skip-gram"]').click();
    const skipTarget = await page.evaluate(() => window.__getAllVocabRows().find(item => item.bk === 1 && window.VocabSkipGram.eligible(item))?.fa);
    if (!skipTarget) throw new Error('No eligible Term 01 Skip-gram sample was found.');
    await page.locator('#learningAnswer').fill(skipTarget);
    await page.locator('#learningCheck').click();
    await page.waitForSelector('.learning-feedback.correct', { timeout: 10000 });
    const learningEvents = await page.evaluate(() => JSON.parse(localStorage.getItem('vocab_learning_attempts_v1') || '[]'));
    if (!learningEvents.every(event => String(event.itemId).startsWith('vocab:source:') && event.legacyId)) throw new Error('Practice events must use canonical IDs and preserve legacy aliases: ' + JSON.stringify(learningEvents));
    if (!learningEvents.some(event => event.modeId === 'imla' && event.correct) || !learningEvents.some(event => event.modeId === 'skip-gram' && event.correct)) {
      throw new Error('Imla and Skip-gram attempts were not persisted independently: ' + JSON.stringify(learningEvents));
    }
    await page.reload({ waitUntil: 'load' });
    await page.waitForSelector('.learning-school', { timeout: 120000 });
    await waitFor(page, 'JSON.parse(localStorage.getItem("vocab_learning_attempts_v1") || "[]").length >= 4', 'Learning School attempt history persists after refresh');
    console.log('PASS: Skip-gram reconstruction and cross-mode attempt persistence');

    await page.locator('[data-mode="imla"]').click();
    await page.locator('#learningAnswer').fill('not-the-right-answer');
    await page.locator('#learningCheck').click();
    await page.waitForSelector('.learning-feedback.incorrect', { timeout: 10000 });
    const dueLabel = await page.locator('#learningQueue option[value="due"]').textContent();
    if (!dueLabel.includes('1')) throw new Error('A missed Imla answer was not immediately due for review: ' + dueLabel);
    await page.locator('#learningNotebook').click();
    await page.waitForSelector('.learning-notebook', { timeout: 10000 });
    if (await page.locator('.learning-mistake-entry').count() < 1) throw new Error('The mistake notebook did not list the missed item.');
    const mistakeId = await page.locator('[data-practice-mistake]').first().getAttribute('data-practice-mistake');
    await page.locator('[data-practice-mistake]').first().click();
    await page.waitForSelector('.learning-question', { timeout: 10000 });
    const mistakeAnswer = await page.evaluate(id => window.__getAllVocabRows().find(item => item.id === id)?.fa, mistakeId);
    if (!mistakeAnswer) throw new Error('The mistake notebook did not preserve its source item identity.');
    await page.locator('#learningAnswer').fill(mistakeAnswer);
    await page.locator('#learningCheck').click();
    await page.waitForSelector('.learning-feedback.correct', { timeout: 10000 });
    await page.locator('#learningNotebook').click();
    await page.waitForSelector('.learning-notebook', { timeout: 10000 });
    if (await page.locator('.learning-mistake-entry').count() !== 0) throw new Error('A successfully recalled item should leave the unresolved mistake notebook.');
    console.log('PASS: a later correct recall clears the unresolved notebook entry');
    await page.locator('#closeLearningNotebook').click();

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
