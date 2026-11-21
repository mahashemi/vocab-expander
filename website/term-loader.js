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
  const term03CoreScripts = [
    "term03-data.js",
    "term03-lexicon-additions.js",
    "term03-matn-verbs.js",
    "term03-source-audit.js",
    "term03-core-semantics.js",
    ...Array.from({ length: 46 }, (_, i) =>
      "term03-additional-semantics-" + String(i + 1).padStart(2, "0") + ".js"
    ),
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
        for (const file of coreTermScripts) await loadScript(file, false);
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
        for (const file of term01SemanticScripts) await loadScript(file, false);
      } else if (number === 2) {
        for (const file of term02SemanticScripts) await loadScript(file, false);
      } else if (number === 3) {
        for (const file of term03CoreScripts) await loadScript(file, false);

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

  async function ensureAllTermsLoaded() {
    for (const term of [1, 2, 3]) await ensureTermLoaded(term);
  }

  async function ensureFeatureLoaded(term, feature) {
    const number = Number(term);
    const key = number + ":" + feature;
    const files = featureScripts[key];
    if (!files) return;
    await ensureTermLoaded(number);
    if (featureLoads.has(key)) return featureLoads.get(key);

    const promise = (async () => {
      for (const file of files) await loadScript(file, false);
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
        for (const file of ["learning/identity.js", "learning/manifest.js", "learning/imla.js", "learning/skip-gram.js", "learning/review-scheduler.js", "learning/meaning-recall.js", "learning/learning-school.js"]) {
          await loadScript(file, false);
        }
      })().catch(error => {
        learningSchoolPromise = null;
        throw error;
      });
    }
    return learningSchoolPromise;
  }

  window.ensureLearningSchool = ensureLearningSchool;
  window.ensureTermLoaded = ensureTermLoaded;
  window.ensureAllTermsLoaded = ensureAllTermsLoaded;
  window.ensureFeatureLoaded = ensureFeatureLoaded;
  window.getLoadedTermNumbers = () => [1, 2, 3].filter(term => loadedTerms.has(term));
})();
