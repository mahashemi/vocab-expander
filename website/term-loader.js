/* On-demand Term 03 data and lesson-feature loader.
   Term 01/02 core data remain available immediately. Term 03 is loaded only
   when selected, searched, or needed by the shared Verb Treasury. */
(function () {
  "use strict";

  window.VOCAB_PORTAL_SUMMARY = Object.freeze({
    version: "2026-11-20",
    1: 775,
    2: 1109,
    3: 2139
  });

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
    "term03-kh3-n3-additions-01.js",
    "term03-chapter-mapping.js",
    // Keep dedup after all reviewed Term 03 data and before Newestan-wide
    // vocabulary additions, matching the original page execution order.
    "term03-dedup.js"
  ];

  const sharedEssayScripts = [
    "newestan-writing-library.js",
    "newestan-language-lessons.js",
    "newestan-writing-ui.js"
  ];
  const featureScripts = {
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
  const featureLoads = new Map();
  let term03Loaded = false;
  let term03Promise = null;

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

  async function ensureTermLoaded(term) {
    if (Number(term) !== 3 || term03Loaded) return;
    if (term03Promise) return term03Promise;

    term03Promise = (async () => {
      for (const file of term03CoreScripts) await loadScript(file, false);

      // These two shared additions ran on the initial page for Terms 01/02.
      // Re-run them after Term 03 exists so their Term 03 records are added too.
      await loadScript("newestan-lexicon-additions.js", true);
      await loadScript("newestan-essay-vocabulary.js", true);

      if (typeof window.__refreshVocabBooks !== "function") {
        throw new Error("The vocabulary app bootstrap is not ready to accept Term 03 data.");
      }
      window.__refreshVocabBooks();
      term03Loaded = true;
      if (window.updateGlobalStats) window.updateGlobalStats();
    })().catch(error => {
      term03Promise = null;
      throw error;
    });

    return term03Promise;
  }

  async function ensureFeatureLoaded(term, feature) {
    const key = Number(term) + ":" + feature;
    const files = featureScripts[key];
    if (!files) return;
    if (Number(term) === 3) await ensureTermLoaded(3);
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

  window.ensureTermLoaded = ensureTermLoaded;
  window.ensureAllTermsLoaded = () => ensureTermLoaded(3);
  window.ensureFeatureLoaded = ensureFeatureLoaded;
  window.getLoadedTermNumbers = () => term03Loaded ? [1, 2, 3] : [1, 2];
})();
