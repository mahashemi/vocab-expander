/* Vocab release 2026-11-21-core-lazy.
   Term 01/02 core data, all semantic layers, Term 03 data and lesson features
   are loaded on demand. Newestan additions run after both Term 01 and Term 02
   core arrays exist, preserving cross-term duplicate checks. */
(function () {
  "use strict";

  window.VOCAB_PORTAL_SUMMARY = Object.freeze({
    version: "2026-11-20-batch06",
    1: 775,
    2: 1109,
    3: 2161
  });

  const sharedSemanticScript = "semantic-meanings.js";
  const coreTermScripts = [
    "term01-data.js",
    "term01-chapters-11-15.js",
    "term01-chapters-16-20.js",
    "term01-supplementary.js",
    "term01-amr-verbs.js",
    "term02-data.js",
    "term02-lexicon-additions.js",
    "term02-proverbs.js",
    "newestan-lexicon-additions.js",
    "newestan-essay-vocabulary.js"
  ];
  const term01SemanticScripts = [
    "term01-semantic-additions.js",
    "term01-core-semantics.js"
  ];
  const term02SemanticScripts = [
    "term02-core-semantics.js",
    ...Array.from({ length: 9 }, (_, i) =>
      "term02-additional-semantics-" + String(i + 1).padStart(2, "0") + ".js"
    )
  ];
  // Term 03's dedup audit includes source identities whose reviewed meanings
  // are maintained in these shared cross-term semantic batches. A direct Term 03
  // deep link must load them even when the user has never opened Terms 01/02.
  const term03SharedSemanticDependencies = [
    "term01-semantic-additions.js",
    "term02-additional-semantics-01.js",
    "term02-additional-semantics-02.js"
  ];

  // Supplementary Term 03 meanings are not needed to draw the first lesson view.
  // Keep them as a separate, lazy enrichment layer so the route can render first.
  const term03AdditionalSemanticScripts = Array.from({ length: 46 }, (_, i) =>
    "term03-additional-semantics-" + String(i + 1).padStart(2, "0") + ".js"
  );

  const term03CoreScripts = [
    "term03-data.js",
    "term03-lexicon-additions.js",
    "term03-matn-verbs.js",
    "term03-source-audit.js",
    "term03-core-semantics.js",
    "term03-page1-additions.js",
    "term03-fa3-reviewed-additions.js",
    "term03-fa3-reading-additions.js",
    "term03-fa3-reading-additions-02.js",
    "term03-fa3-reading-additions-03.js",
    "term03-fa3-reading-additions-04.js",
    "term03-fa3-reading-additions-05.js",
    "term03-fa3-reading-additions-06.js",
    "term03-kh3-n3-additions-01.js",
    "term03-chapter-mapping.js",
    // Keep dedup after all reviewed Term 03 data and before Newestan-wide
    // vocabulary additions, matching the original page execution order.
    "term03-dedup.js"
  ];

  const sharedEssayScripts = [
    "newestan-writing-library.js",
    "newestan-language-lessons.js",
    "newestan-rubric.js",
    "newestan-writing-ui.js"
  ];
  const featureScripts = {
    "1:essays": sharedEssayScripts,
    "2:khulasa": ["term02-khulasa.js"],
    "2:speeches": ["term02-speeches.js"],
    "2:essays": sharedEssayScripts,
    "3:khulasa": ["term03-khulasa.js"],
    "3:speeches": ["term03-speeches.js"],
    "3:essays": [
      "term03-newestan-final-insha.js",
      "term03-newestan-insha.js",
      "term03-newestan-teaching.js",
      "term03-newestan-teaching-ui.js",
      ...sharedEssayScripts,
      "term03-newestan-standalone.js"
    ]
  };

  const scriptLoads = new Map();
  const termLoads = new Map();
  const featureLoads = new Map();
  const loadedTerms = new Set();
  let sharedSemanticsPromise = null;
  let coreTermsPromise = null;
  let learningSchoolPromise = null;
  let term03SemanticsPromise = null;

  // Dynamic scripts with async=false execute in insertion order. Insert an entire
  // dependency-ordered batch immediately so the browser can fetch files in parallel
  // without changing the original script execution order.
  function loadScriptsInOrder(files, replay) {
    return Promise.all(files.map(file => loadScript(file, replay)));
  }

  function loadScript(file, replay) {
    const src = replay ? file + "?term03-replay=1" : file;
    if (scriptLoads.has(src)) return scriptLoads.get(src);

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL(src, document.baseURI).href;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => {
        script.remove();
        scriptLoads.delete(src);
        reject(new Error("Unable to load learning module: " + file));
      };
      document.head.appendChild(script);
    });
    scriptLoads.set(src, promise);
    return promise;
  }

  async function ensureCoreTerms() {
    if (!coreTermsPromise) {
      coreTermsPromise = (async () => {
        await loadScriptsInOrder(coreTermScripts, false);
        if (typeof window.__refreshVocabBooks !== "function") {
          throw new Error("The vocabulary app bootstrap is not ready to accept Term 01/02 data.");
        }
        window.__refreshVocabBooks();
      })().catch(error => {
        coreTermsPromise = null;
        throw error;
      });
    }
    return coreTermsPromise;
  }

  async function ensureSharedSemantics() {
    if (!sharedSemanticsPromise) {
      sharedSemanticsPromise = loadScript(sharedSemanticScript, false).catch(error => {
        sharedSemanticsPromise = null;
        throw error;
      });
    }
    return sharedSemanticsPromise;
  }

  async function ensureTermLoaded(term) {
    const number = Number(term);
    if (![1, 2, 3].includes(number) || loadedTerms.has(number)) return;
    if (termLoads.has(number)) return termLoads.get(number);

    const promise = (async () => {
      await ensureCoreTerms();
      await ensureSharedSemantics();

      if (number === 1) {
        await loadScriptsInOrder(term01SemanticScripts, false);
      } else if (number === 2) {
        await loadScriptsInOrder(term02SemanticScripts, false);
      } else if (number === 3) {
        // The dedup plan audits semantic coverage, but its data transformation does
        // not require all 46 supplementary meaning batches. Mark the audit pending
        // until the background enrichment layer has completed.
        window.TERM03_SEMANTICS_PENDING = true;
        await loadScriptsInOrder([...term03SharedSemanticDependencies, ...term03CoreScripts], false);
        window.TERM03_CORE_READY = true;

        // These two shared additions ran on the initial page for Terms 01/02.
        // Re-run them after Term 03 exists so their Term 03 records are added too.
        await loadScript("newestan-lexicon-additions.js", true);
        await loadScript("newestan-essay-vocabulary.js", true);

        if (typeof window.__refreshVocabBooks !== "function") {
          throw new Error("The vocabulary app bootstrap is not ready to accept Term 03 data.");
        }
        window.__refreshVocabBooks();
      }

      loadedTerms.add(number);
      if (window.updateGlobalStats) window.updateGlobalStats();
    })().catch(error => {
      termLoads.delete(number);
      throw error;
    });

    termLoads.set(number, promise);
    return promise;
  }

  async function ensureTerm03Semantics() {
    if (window.TERM03_SEMANTICS_READY) return;
    if (!term03SemanticsPromise) {
      term03SemanticsPromise = (async () => {
        await ensureTermLoaded(3);
        await loadScriptsInOrder(term03AdditionalSemanticScripts, false);
        window.TERM03_SEMANTICS_PENDING = false;
        const missing = typeof window.__refreshTerm03DedupSemanticAudit === "function"
          ? window.__refreshTerm03DedupSemanticAudit()
          : (window.TERM03_DEDUP_AUDIT && window.TERM03_DEDUP_AUDIT.missingSemantics) || [];
        if (missing.length) {
          throw new Error("Term 03 semantic enrichment is incomplete: " + missing.join(", "));
        }
        window.TERM03_SEMANTICS_READY = true;
      })().catch(error => {
        term03SemanticsPromise = null;
        window.TERM03_SEMANTICS_PENDING = true;
        throw error;
      });
    }
    return term03SemanticsPromise;
  }

  async function ensureAllTermsLoaded() {
    // Search and cross-term study require complete semantics; ordinary lesson
    // navigation only waits for the smaller core data needed to render the page.
    await Promise.all([1, 2, 3].map(term => ensureTermLoaded(term)));
    await ensureTerm03Semantics();
  }

  async function ensureFeatureLoaded(term, feature) {
    const number = Number(term);
    const key = number + ":" + feature;
    const files = featureScripts[key];
    if (!files) return;
    await ensureTermLoaded(number);
    if (number === 3) await ensureTerm03Semantics();
    if (featureLoads.has(key)) return featureLoads.get(key);

    const promise = (async () => {
      await loadScriptsInOrder(files, false);
    })().catch(error => {
      featureLoads.delete(key);
      throw error;
    });
    featureLoads.set(key, promise);
    return promise;
  }

  async function ensureLearningSchool() {
    if (!learningSchoolPromise) {
      learningSchoolPromise = (async () => {
        await ensureAllTermsLoaded();
        await loadScriptsInOrder(["learning/identity.js", "learning/manifest.js", "learning/imla.js", "learning/skip-gram.js", "learning/review-scheduler.js", "learning/meaning-recall.js", "learning/learning-school.js"], false);
      })().catch(error => {
        learningSchoolPromise = null;
        throw error;
      });
    }
    return learningSchoolPromise;
  }

  window.ensureLearningSchool = ensureLearningSchool;
  window.ensureTerm03Semantics = ensureTerm03Semantics;
  window.ensureTermLoaded = ensureTermLoaded;
  window.ensureAllTermsLoaded = ensureAllTermsLoaded;
  window.ensureFeatureLoaded = ensureFeatureLoaded;
  window.getLoadedTermNumbers = () => [1, 2, 3].filter(term => loadedTerms.has(term));
})();
