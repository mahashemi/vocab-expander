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

    // A fresh page must be able to open Term 03 without first visiting Term 01/02.
    const directPage = await context.newPage();
    directPage.on('pageerror', error => pageErrors.push(String(error)));
    await directPage.goto(target + '?route-test=fresh-term03#/term/3/fa/chapter/1', { waitUntil: 'domcontentloaded', timeout: 120000 });
    const freshRouteState = await directPage.evaluate(() => ({
      boot: document.documentElement.classList.contains('route-boot'),
      requestedRoute: location.hash === '#/term/3/fa/chapter/1',
      contentReady: !!document.querySelector('.term-welcome')
    }));
    if (!freshRouteState.boot && !(freshRouteState.requestedRoute && freshRouteState.contentReady)) {
      throw new Error('Fresh Term 03 deep link exposed the portal before its requested route was ready: ' + JSON.stringify(freshRouteState));
    }
    await waitFor(directPage, 'window.TERM03_DEDUP_APPLIED === true && Array.isArray(window.TERM3_DATA) && window.TERM3_DATA.length > 1800', 'fresh Term 03 deep link loads independently of prior term navigation');
    const freshTermIsolation = await directPage.evaluate(() => ({ term1: typeof window.TERM1_DATA, term2: typeof window.TERM2_DATA }));
    if (freshTermIsolation.term1 !== 'undefined' || freshTermIsolation.term2 !== 'undefined') throw new Error('A direct Term 03 route downloaded unrelated Term 01/02 data: ' + JSON.stringify(freshTermIsolation));
    await waitFor(directPage, '!document.documentElement.classList.contains("route-boot") && document.querySelector(".term-welcome")', 'fresh Term 03 lesson renders before cross-term enrichment');
    await waitFor(directPage, 'window.TERM03_SEMANTICS_READY === true', 'fresh Term 03 route completes its own trilingual enrichment');
    const isolatedAfterEnrichment = await directPage.evaluate(() => ({
      term1: typeof window.TERM1_DATA,
      term2: typeof window.TERM2_DATA,
      allTermsReady: window.ALL_TERM_CORE_DATA_READY === true
    }));
    if (isolatedAfterEnrichment.term1 !== 'undefined' || isolatedAfterEnrichment.term2 !== 'undefined' || isolatedAfterEnrichment.allTermsReady) {
      throw new Error('A Term 03 chapter route eagerly loaded unrelated term payloads: ' + JSON.stringify(isolatedAfterEnrichment));
    }
    let freshDedupAudit = await directPage.evaluate(() => window.TERM03_DEDUP_AUDIT);
    if (!freshDedupAudit || freshDedupAudit.missingSemantics.length || freshDedupAudit.missing.length || freshDedupAudit.duplicateIds.length || freshDedupAudit.duplicateHeadwordPos.length || freshDedupAudit.sourceLoss.length) {
      throw new Error('Fresh Term 03 route is missing reviewed trilingual semantic dependencies: ' + JSON.stringify(freshDedupAudit));
    }
    await directPage.reload({ waitUntil: 'domcontentloaded', timeout: 120000 });
    await waitFor(directPage, 'window.TERM03_DEDUP_APPLIED === true && !document.documentElement.classList.contains("route-boot") && document.querySelector(".term-welcome")', 'fresh Term 03 route survives a hard refresh');
    await waitFor(directPage, 'window.TERM03_SEMANTICS_READY === true', 'fresh Term 03 refresh restores the complete semantic layer');
    freshDedupAudit = await directPage.evaluate(() => window.TERM03_DEDUP_AUDIT);
    if (freshDedupAudit.missingSemantics.length) throw new Error('Term 03 semantic dependencies disappeared after refresh: ' + JSON.stringify(freshDedupAudit.missingSemantics));
    await directPage.close();
    console.log('PASS: fresh Term 03 deep link and hard refresh retain complete trilingual dedup semantics');

    await page.goto(target + '#/term/1/fa', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'window.getLoadedTermNumbers().includes(1) && Array.isArray(window.TERM1_DATA) && window.TERM1_DATA.length > 0', 'Term 01 active core data loads');
    const firstTermIsolation = await page.evaluate(() => ({
      term2: typeof window.TERM2_DATA,
      term3: typeof window.TERM3_DATA,
      allTermsReady: window.ALL_TERM_CORE_DATA_READY === true
    }));
    if (firstTermIsolation.term2 !== 'undefined' || firstTermIsolation.term3 !== 'undefined' || firstTermIsolation.allTermsReady) {
      throw new Error('Opening Term 01 should not preload Term 02/03: ' + JSON.stringify(firstTermIsolation));
    }
    console.log('PASS: Term 01 route loads only its active term');

    await page.goto(target + '#/term/2/fa', { waitUntil: 'load', timeout: 120000 });
    await waitFor(page, 'window.getLoadedTermNumbers().includes(2) && Array.isArray(window.TERM2_DATA) && window.TERM2_DATA.length > 0', 'Term 02 loads its own core data and semantic layer');
    // The portal manifest includes shared Newestan additions and Term 03.
    // Request the explicit all-library workflow before comparing full totals.
    await page.evaluate(() => window.ensureAllTermsLoaded());
    await waitFor(page, 'window.ALL_TERM_CORE_DATA_READY === true && window.TERM03_SEMANTICS_READY === true', 'explicit all-term workflow loads the complete cross-term library');
    const allTermCounts = await page.evaluate(() => window.__getRuntimeVocabCounts());
    if (allTermCounts[1] !== initial.portalSummary[1] || allTermCounts[2] !== initial.portalSummary[2]) {
      throw new Error('Deferred Term 01/02 data does not reconcile to the portal manifest: ' + JSON.stringify(allTermCounts));
    }
    console.log('PASS: Term 01/02 data reconciles after both terms are opened');

    await page.goto(target + '?route-test=deep-link#/term/3/fa/chapter/1', { waitUntil: 'domcontentloaded', timeout: 120000 });
    const directRouteState = await page.evaluate(() => ({
      boot: document.documentElement.classList.contains('route-boot'),
      requestedRoute: location.hash === '#/term/3/fa/chapter/1',
      contentReady: !!document.querySelector('.term-welcome')
    }));
    if (!directRouteState.boot && !(directRouteState.requestedRoute && directRouteState.contentReady)) {
      throw new Error('A direct deep link exposed the static portal before the requested route was ready: ' + JSON.stringify(directRouteState));
    }
    await waitFor(page, 'window.TERM03_DEDUP_APPLIED === true && Array.isArray(window.TERM3_DATA) && window.TERM3_DATA.length > 1800 && window.getLoadedTermNumbers().includes(3)', 'direct Term 03 deep link loads the full deduplicated vocabulary');
    await waitFor(page, '!document.documentElement.classList.contains("route-boot") && location.hash === "#/term/3/fa/chapter/1" && document.querySelector(".term-welcome")', 'deep link reveals its requested page without a portal flash');
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 120000 });
    const refreshRouteState = await page.evaluate(() => ({
      boot: document.documentElement.classList.contains('route-boot'),
      requestedRoute: location.hash === '#/term/3/fa/chapter/1',
      contentReady: !!document.querySelector('.term-welcome')
    }));
    if (!refreshRouteState.boot && !(refreshRouteState.requestedRoute && refreshRouteState.contentReady)) {
      throw new Error('Refreshing a deep link exposed the portal before the requested route was ready: ' + JSON.stringify(refreshRouteState));
    }
    await waitFor(page, 'window.TERM03_DEDUP_APPLIED === true && !document.documentElement.classList.contains("route-boot") && location.hash === "#/term/3/fa/chapter/1" && document.querySelector(".term-welcome")', 'hard refresh restores the exact Term 03 chapter route');
    await waitFor(page, 'window.TERM03_SEMANTICS_READY === true', 'Term 03 supplementary semantics load after the first route render');
    const dedupAudit = await page.evaluate(() => window.TERM03_DEDUP_AUDIT);
    if (!dedupAudit || dedupAudit.expectedAfter !== dedupAudit.after || dedupAudit.after !== dedupAudit.actualBefore - dedupAudit.approvedMerges - dedupAudit.decisionMerges || dedupAudit.missing.length || dedupAudit.duplicateIds.length || dedupAudit.duplicateHeadwordPos.length || dedupAudit.missingSemantics.length || dedupAudit.sourceLoss.length) {
      throw new Error('Term 03 deduplication audit is inconsistent: ' + JSON.stringify(dedupAudit));
    }
    if (dedupAuditErrors.length) throw new Error('Term 03 deduplication emitted an audit error: ' + dedupAuditErrors.join(' | '));
    console.log('PASS: Term 03 dedup audit reconciles against the live pre-merge dataset (' + dedupAudit.actualBefore + ' → ' + dedupAudit.after + ')');
    if (dedupAudit.progressMigrated) throw new Error('A clean browser profile unexpectedly reported saved-progress migration.');
    await page.waitForSelector('.term-welcome', { timeout: 60000 });
    // A fresh Term 03 route intentionally keeps Terms 01/02 unloaded.
    // Load the complete library explicitly before comparing the full manifest.
    await page.evaluate(() => window.ensureAllTermsLoaded());
    await waitFor(page, 'window.ALL_TERM_CORE_DATA_READY === true && window.TERM03_SEMANTICS_READY === true', 'explicit all-term workflow restores the complete library after a fresh Term 03 route');
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
    const searchIndexFirst = await page.evaluate(() => window.__getGlobalSearchDiagnostics?.());
    if (!searchIndexFirst || !searchIndexFirst.built || searchIndexFirst.size < 3000) throw new Error('Global search did not build a complete reusable index: ' + JSON.stringify(searchIndexFirst));
    await page.locator('#globalSearchInput').fill('return');
    await waitFor(page, 'window.__getGlobalSearchDiagnostics?.().built === 1', 'global search reuses its pre-normalized index for later queries');
    const searchIndexSecond = await page.evaluate(() => window.__getGlobalSearchDiagnostics());
    if (searchIndexSecond.built !== searchIndexFirst.built || searchIndexSecond.size !== searchIndexFirst.size) throw new Error('Global search rebuilt its index on a subsequent query: ' + JSON.stringify({first:searchIndexFirst,second:searchIndexSecond}));

    await page.goto(target, { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('[data-open-verbs]', { state: 'visible', timeout: 60000 });
    await page.click('[data-open-verbs]');
    await page.waitForSelector('#verbSearch', { state: 'visible', timeout: 120000 });
    console.log('PASS: Verb Treasury loads all-term data on demand');

    await page.goto(target + '#/learning', { waitUntil: 'load', timeout: 120000 });
    await page.waitForSelector('.learning-school', { timeout: 120000 });
    await waitFor(page, 'typeof window.VocabImla?.validate === "function" && typeof window.VocabSkipGram?.validate === "function" && typeof window.VocabReviewScheduler?.evaluate === "function" && typeof window.VocabMeaningRecall?.validate === "function" && typeof window.__getAllVocabRows === "function"', 'Learning School and independent Imla/Skip-gram modules load on demand');
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
    await waitFor(page, 'JSON.parse(localStorage.getItem("vocab_learning_attempts_v1") || "[]").length >= 2', 'Imla and Skip-gram attempt history persists after refresh');
    console.log('PASS: Skip-gram reconstruction and cross-mode attempt persistence');

    const meaningCoverage = await page.evaluate(() => {
      const rows = window.__getAllVocabRows();
      return {
        english: rows.filter(item => item.bk === 3 && window.VocabMeaningRecall.eligible(item, {language: 'en'})).length,
        arabic: rows.filter(item => item.bk === 3 && window.VocabMeaningRecall.eligible(item, {language: 'ar'})).length
      };
    });
    if (meaningCoverage.english < 100 || meaningCoverage.arabic < 100) throw new Error('Term 03 reviewed trilingual meaning coverage is unexpectedly low: ' + JSON.stringify(meaningCoverage));
    await page.locator('#learningTerm').selectOption('3');
    await page.locator('[data-mode="meaning-recall"]').click();
    await page.locator('#learningMeaningLanguage').selectOption('ar');
    const arabicMeaning = await page.evaluate(() => {
      const item = window.__getAllVocabRows().find(x => x.bk === 3 && window.VocabMeaningRecall.eligible(x, {language: 'ar'}));
      return item ? {id: item.id, answer: item.sem.arSynonyms?.[0] || item.sem.arMeaning} : null;
    });
    if (!arabicMeaning?.answer) throw new Error('No reviewed Arabic meaning was available for Term 03.');
    await page.locator('#learningAnswer').fill(arabicMeaning.answer);
    await page.locator('#learningCheck').click();
    await page.waitForSelector('.learning-feedback.correct', { timeout: 10000 });
    await page.locator('#learningMeaningLanguage').selectOption('en');
    const englishMeaning = await page.evaluate(() => {
      const item = window.__getAllVocabRows().find(x => x.bk === 3 && window.VocabMeaningRecall.eligible(x, {language: 'en'}));
      return item ? {id: item.id, answer: item.sem.enSynonyms?.[0] || item.sem.enMeaning} : null;
    });
    if (!englishMeaning?.answer) throw new Error('No reviewed English meaning was available for Term 03.');
    await page.locator('#learningAnswer').fill(englishMeaning.answer);
    await page.locator('#learningCheck').click();
    await page.waitForSelector('.learning-feedback.correct', { timeout: 10000 });
    const meaningEvents = await page.evaluate(() => JSON.parse(localStorage.getItem('vocab_learning_attempts_v1') || '[]'));
    if (!meaningEvents.some(event => event.modeId === 'meaning-recall-ar' && event.correct) || !meaningEvents.some(event => event.modeId === 'meaning-recall-en' && event.correct)) {
      throw new Error('English and Arabic meaning attempts were not tracked independently: ' + JSON.stringify(meaningEvents));
    }
    console.log('PASS: Term 03 English and Arabic meaning recall use reviewed trilingual semantics');

    await page.locator('[data-mode="imla"]').click();
    await page.locator('#learningAnswer').fill('not-the-right-answer');
    await page.locator('#learningCheck').click();
    await page.waitForSelector('.learning-feedback.incorrect', { timeout: 10000 });
    if (!(await page.locator('#learningFeedback').textContent()).includes('Letter-level feedback')) throw new Error('Imla did not provide grapheme-level error feedback.');
    const dueLabel = await page.locator('#learningQueue option[value="due"]').textContent();
    if (!dueLabel.includes('1')) throw new Error('A missed Imla answer was not immediately due for review: ' + dueLabel);
    await page.locator('#learningNotebook').click();
    await page.waitForSelector('.learning-notebook', { timeout: 10000 });
    if (await page.locator('.learning-mistake-entry').count() < 1) throw new Error('The mistake notebook did not list the missed item.');
    if (!(await page.locator('.learning-mistake-entry').first().textContent()).includes('positions:')) throw new Error('The mistake notebook did not retain error positions.');
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
    await page.reload({ waitUntil: 'load' });
    await page.waitForSelector('.learning-school', { timeout: 120000 });
    await waitFor(page, 'JSON.parse(localStorage.getItem("vocab_learning_attempts_v1") || "[]").length >= 6', 'Meaning, mistake and re-practice attempts persist after refresh');
    await page.locator('#learningNotebook').click();
    await page.waitForSelector('.learning-notebook', { timeout: 10000 });
    if (await page.locator('.learning-mistake-entry').count() !== 0) throw new Error('Resolved mistakes reappeared after refresh.');
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
