/* Vocab release 2026-11-22-order-independent-shared-additions.
   Term data and features are loaded on demand. Shared Newestan additions run
   only after all three term arrays exist, preserving cross-term dedup order. */
(function () {
  "use strict";

  window.VOCAB_PORTAL_SUMMARY = Object.freeze({
    version: "2026-11-22-cross-term-dedup02",
    1: 762,
    2: 1107,
    3: 2161
  });

  const assetVersion = "20261128-static-learning-school-index";
  window.VOCAB_DATA_VERSION = assetVersion;
  const sharedSemanticScript = "semantic-meanings.js";
  const term01CoreScripts = [
    "term01-data.js",
    "term01-chapters-11-15.js",
    "term01-chapters-16-20.js",
    "term01-supplementary.js",
    "term01-amr-verbs.js"
  ];
  const term02CoreScripts = [
    "term02-data.js",
    "term02-lexicon-additions.js",
    "term02-proverbs.js"
  ];
  const sharedTermAdditions = [
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
  // These cross-term meaning batches are required by the Term 03 semantic audit,
  // but not by its first vocabulary render. Load them in the post-render enrichment.
  const term03SharedSemanticDependencies = [
    "term01-semantic-additions.js",
    "term02-additional-semantics-01.js",
    "term02-additional-semantics-02.js"
  ];

  // Supplementary Term 03 meanings are not needed to draw the first lesson view.
  // Keep them as a separate, lazy enrichment layer so the route can render first.
  const term03AdditionalSemanticScripts = ["term03-additional-semantics-bundle.js"];

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
    "newestan-writing-worksheets.js",
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
      "term03-newestan-chapter-guide.js",
      ...sharedEssayScripts,
      "term03-newestan-standalone.js"
    ]
  };

  const scriptLoads = new Map();
  const termLoads = new Map();
  const termSemanticLoads = new Map();
  const featureLoads = new Map();
  const loadedTerms = new Set();
  let sharedSemanticsPromise = null;
  let coreTermsPromise = null;
  let learningSchoolPromise = null;
  let learningSemanticsPromise = null;
  let learningDataPromise = null;
  let learningIndexPromise = null;
  let learningFullDataPromise = null;
  let term03SemanticsPromise = null;
  let sharedTermAdditionsPromise = null;
  let allTermCorePromise = null;

  // Dynamic scripts with async=false execute in insertion order. Insert an entire
  // dependency-ordered batch immediately so the browser can fetch files in parallel
  // without changing the original script execution order.
  function loadScriptsInOrder(files, replay, replayKey) {
    return Promise.all(files.map(file => loadScript(file, replay, replayKey)));
  }

  function loadScript(file, replay, replayKey) {
    const versionedFile = file + "?v=" + assetVersion;
    const src = replay ? versionedFile + "&term-replay=" + String(replayKey || "1") : versionedFile;
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
    // The app bootstrap is loaded up front; term data itself is fetched only for
    // the active term. This keeps a Term 03 deep link from downloading Terms 01/02.
    if (!coreTermsPromise) {
      coreTermsPromise = Promise.resolve().then(() => {
        if (typeof window.__refreshVocabBooks !== "function") {
          throw new Error("The vocabulary app bootstrap is not ready to accept term data.");
        }
      }).catch(error => {
        coreTermsPromise = null;
        throw error;
      });
    }
    return coreTermsPromise;
  }

  async function loadSharedTermAdditions() {
    // These source-backed additions may target any term. Wait until all three
    // canonical term arrays exist so duplicate resolution is independent of
    // which term the learner happened to open first.
    await loadScriptsInOrder(sharedTermAdditions, true, "terms-1-2-3");
    if (typeof window.__refreshVocabBooks === "function") window.__refreshVocabBooks();
  }

  async function ensureSharedTermAdditions() {
    if (![1, 2, 3].every(term => loadedTerms.has(term))) return;
    if (!sharedTermAdditionsPromise) {
      sharedTermAdditionsPromise = loadSharedTermAdditions().catch(error => {
        sharedTermAdditionsPromise = null;
        throw error;
      });
    }
    return sharedTermAdditionsPromise;
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
      if (number === 1) {
        await loadScriptsInOrder(term01CoreScripts, false);
        window.__refreshVocabBooks();
      } else if (number === 2) {
        await loadScriptsInOrder(term02CoreScripts, false);
        window.__refreshVocabBooks();
      } else if (number === 3) {
        // The dedup plan audits semantic coverage, but its data transformation does
        // not require all 46 supplementary meaning batches. Mark the audit pending
        // until the background enrichment layer has completed.
        window.TERM03_SEMANTICS_PENDING = true;
        await loadScriptsInOrder(term03CoreScripts, false);
        window.TERM03_CORE_READY = true;

        if (typeof window.__refreshVocabBooks !== "function") {
          throw new Error("The vocabulary app bootstrap is not ready to accept Term 03 data.");
        }
        window.__refreshVocabBooks();
      }

      loadedTerms.add(number);
      if (loadedTerms.size === 3) await ensureSharedTermAdditions();
      if (window.updateGlobalStats) window.updateGlobalStats();
    })().catch(error => {
      loadedTerms.delete(number);
      termLoads.delete(number);
      throw error;
    });

    termLoads.set(number, promise);
    return promise;
  }

  async function ensureTermSemantics(term) {
    const number = Number(term);
    if (![1, 2].includes(number)) return;
    const readyFlag = number === 1 ? "TERM01_SEMANTICS_READY" : "TERM02_SEMANTICS_READY";
    if (window[readyFlag]) return;
    if (termSemanticLoads.has(number)) return termSemanticLoads.get(number);

    const promise = (async () => {
      await ensureTermLoaded(number);
      await ensureSharedSemantics();
      await loadScriptsInOrder(number === 1 ? term01SemanticScripts : term02SemanticScripts, false);
      window[readyFlag] = true;
      if (typeof window.__refreshVocabBooks === "function") window.__refreshVocabBooks();
      if (window.performance && window.performance.mark) {
        window.performance.mark("vocab-term" + String(number).padStart(2, "0") + "-semantics-ready");
      }
      if (typeof window.refreshActiveTermViewIfSafe === "function") window.refreshActiveTermViewIfSafe();
    })().catch(error => {
      window[readyFlag] = false;
      termSemanticLoads.delete(number);
      throw error;
    });
    termSemanticLoads.set(number, promise);
    return promise;
  }

  async function ensureTerm03Semantics() {
    if (window.TERM03_SEMANTICS_READY) return;
    if (!term03SemanticsPromise) {
      term03SemanticsPromise = (async () => {
        await ensureTermLoaded(3);
        await ensureSharedSemantics();
        await loadScriptsInOrder(term03SharedSemanticDependencies, false);
        await loadScriptsInOrder(term03AdditionalSemanticScripts, false);
        window.TERM03_SEMANTICS_PENDING = false;
        const missing = typeof window.__refreshTerm03DedupSemanticAudit === "function"
          ? window.__refreshTerm03DedupSemanticAudit()
          : (window.TERM03_DEDUP_AUDIT && window.TERM03_DEDUP_AUDIT.missingSemantics) || [];
        if (missing.length) {
          throw new Error("Term 03 semantic enrichment is incomplete: " + missing.join(", "));
        }
        window.TERM03_SEMANTICS_READY = true;
        if (window.performance && window.performance.mark) window.performance.mark("vocab-term03-semantics-ready");
      })().catch(error => {
        term03SemanticsPromise = null;
        window.TERM03_SEMANTICS_PENDING = true;
        throw error;
      });
    }
    return term03SemanticsPromise;
  }

  async function ensureAllTermCoreDataLoaded() {
    if (window.ALL_TERM_CORE_DATA_READY) return;
    if (!allTermCorePromise) {
      allTermCorePromise = Promise.all([1, 2, 3].map(term => ensureTermLoaded(term))).then(() => {
        window.ALL_TERM_CORE_DATA_READY = true;
        if (window.performance && window.performance.mark) window.performance.mark("vocab-all-term-core-ready");
        if (typeof window.refreshActiveTermViewIfSafe === "function") window.refreshActiveTermViewIfSafe();
      }).catch(error => {
        allTermCorePromise = null;
        throw error;
      });
    }
    return allTermCorePromise;
  }

  async function ensureAllTermsLoaded() {
    // Search and cross-term study require complete data and semantics. Normal
    // route rendering can begin with the active term and enrich in the background.
    await ensureAllTermCoreDataLoaded();
    await Promise.all([ensureTermSemantics(1), ensureTermSemantics(2), ensureTerm03Semantics()]);
  }

  async function ensureFeatureLoaded(term, feature) {
    const number = Number(term);
    const key = number + ":" + feature;
    const files = featureScripts[key];
    if (!files) return;
    if (feature === "essays") await ensureAllTermsLoaded();
    else {
      await ensureTermLoaded(number);
      if (number === 3) await ensureTerm03Semantics();
      else await ensureTermSemantics(number);
    }
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

  async function ensureLearningSchoolIndex() {
    if (window.LEARNING_SCHOOL_INDEX) return window.LEARNING_SCHOOL_INDEX;
    if (!learningIndexPromise) {
      learningIndexPromise = (async () => {
        // A tiny no-store pointer keeps the content-hashed JSON assets fresh
        // whenever GitHub Actions regenerates them from the current OCR sources.
        const url = new URL("learning/data/learning-school-index.json?t=" + Date.now(), document.baseURI);
        const response = await fetch(url.href, { cache: "no-store" });
        if (!response.ok) throw new Error("Unable to load the Learning School data index (" + response.status + ")");
        const index = await response.json();
        if (index.schemaVersion !== 1 || typeof index.firstUrl !== "string" || typeof index.coreUrl !== "string" || typeof index.meaningsUrl !== "string") {
          throw new Error("The Learning School data index has an unsupported schema");
        }
        window.LEARNING_SCHOOL_INDEX = index;
        return index;
      })().catch(error => {
        learningIndexPromise = null;
        throw error;
      });
    }
    return learningIndexPromise;
  }

  async function fetchLearningSchoolJson(gzipUrl, plainUrl) {
    if (gzipUrl && typeof DecompressionStream === "function") {
      try {
        const compressed = await fetch(new URL(gzipUrl, document.baseURI).href, { cache: "force-cache" });
        if (compressed.ok) {
          if ((compressed.headers.get("content-encoding") || "").toLowerCase().includes("gzip")) {
            return compressed.json();
          }
          const bytes = await compressed.arrayBuffer();
          const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
          return await new Response(stream).json();
        }
      } catch (error) {
        // Older browsers or a misconfigured static MIME type can use the plain JSON fallback.
      }
    }
    const response = await fetch(new URL(plainUrl, document.baseURI).href, { cache: "force-cache" });
    if (!response.ok) throw new Error("Unable to load Learning School data (" + response.status + ")");
    return response.json();
  }

  async function ensureLearningSchoolData() {
    if (window.LEARNING_SCHOOL_DATA) return window.LEARNING_SCHOOL_DATA;
    if (!learningDataPromise) {
      learningDataPromise = (async () => {
        const index = await ensureLearningSchoolIndex();
        const data = await fetchLearningSchoolJson(index.firstGzipUrl, index.firstUrl);
        if (data.schemaVersion !== 1 || !Array.isArray(data.rows) || !Array.isArray(data.allItemRefs) || !data.stats) {
          throw new Error("The quick-start Learning School data has an unsupported or incomplete schema");
        }
        window.LEARNING_SCHOOL_DATA = data;
        window.LEARNING_SCHOOL_FULL_DATA_READY = false;
        if (window.performance && window.performance.mark) {
          window.performance.mark("vocab-learning-school-data-ready");
        }
        return data;
      })().catch(error => {
        learningDataPromise = null;
        throw error;
      });
    }
    return learningDataPromise;
  }

  function applyLearningSchoolMeanings(rows, aliasIndex, meanings) {
    const aliases = aliasIndex?.aliases || {};
    for (const row of Array.isArray(rows) ? rows : []) {
      const canonicalId = row.canonicalId || aliases[String(row.id)] ||
        aliases["vocab:source:" + encodeURIComponent(String(row.id)) + ":" + encodeURIComponent(String(row.fa || ""))];
      const itemMeanings = meanings[canonicalId];
      if (itemMeanings) row.sem = itemMeanings;
    }
  }

  async function ensureLearningSchoolFullData() {
    if (window.LEARNING_SCHOOL_FULL_DATA_READY) return window.LEARNING_SCHOOL_DATA;
    if (!learningFullDataPromise) {
      learningFullDataPromise = (async () => {
        const index = await ensureLearningSchoolIndex();
        const full = await fetchLearningSchoolJson(index.coreGzipUrl, index.coreUrl);
        if (full.schemaVersion !== 1 || !Array.isArray(full.rows) || !full.aliasIndex || !full.aliasIndex.valid) {
          throw new Error("The full Learning School data has an unsupported or incomplete schema");
        }
        const data = await ensureLearningSchoolData();
        data.rows = full.rows;
        data.aliasIndex = full.aliasIndex;
        data.stats = full.stats || data.stats;
        if (window.LEARNING_SCHOOL_MEANINGS) {
          applyLearningSchoolMeanings(data.rows, data.aliasIndex, window.LEARNING_SCHOOL_MEANINGS);
        }
        window.LEARNING_SCHOOL_FULL_DATA_READY = true;
        if (window.performance && window.performance.mark) {
          window.performance.mark("vocab-learning-school-full-data-ready");
        }
        window.dispatchEvent(new Event("learning-school-full-data-ready"));
        return data;
      })().catch(error => {
        learningFullDataPromise = null;
        throw error;
      });
    }
    return learningFullDataPromise;
  }

  async function ensureLearningSemantics() {
    if (window.LEARNING_SCHOOL_SEMANTICS_READY) return;
    if (!learningSemanticsPromise) {
      learningSemanticsPromise = (async () => {
        const data = await ensureLearningSchoolData();
        const index = await ensureLearningSchoolIndex();
        const payload = await fetchLearningSchoolJson(index.meaningsGzipUrl, index.meaningsUrl);
        if (payload.schemaVersion !== 1 || !payload.byItemId) throw new Error("The trilingual Learning School data has an unsupported schema");
        window.LEARNING_SCHOOL_MEANINGS = payload.byItemId;
        applyLearningSchoolMeanings(data.rows, data.aliasIndex, payload.byItemId);
        window.LEARNING_SCHOOL_SEMANTICS_READY = true;
        if (window.performance && window.performance.mark) {
          window.performance.mark("vocab-learning-school-semantics-ready");
        }
      })().catch(error => {
        learningSemanticsPromise = null;
        throw error;
      });
    }
    return learningSemanticsPromise;
  }

  async function ensureLearningSchool() {
    if (!learningSchoolPromise) {
      learningSchoolPromise = (async () => {
        if (window.performance && window.performance.mark) {
          window.performance.mark("vocab-learning-school-start");
        }
        // The static core index is generated by GitHub Actions. The browser
        // downloads one compact JSON asset instead of evaluating all term scripts.
        await ensureLearningSchoolData();
        await loadScriptsInOrder(["learning/identity.js", "learning/manifest.js", "learning/mode-registry.js", "learning/imla.js", "learning/skip-gram.js", "learning/review-scheduler.js", "learning/meaning-recall.js", "learning/progress-summary.js", "learning/learning-school.js"], false);
        if (window.performance && window.performance.mark) {
          window.performance.mark("vocab-learning-school-core-ready");
        }
      })().catch(error => {
        learningSchoolPromise = null;
        throw error;
      });
    }
    return learningSchoolPromise;
  }

  window.ensureLearningSchool = ensureLearningSchool;
  window.ensureLearningSchoolData = ensureLearningSchoolData;
  window.ensureLearningSchoolFullData = ensureLearningSchoolFullData;
  window.ensureLearningSemantics = ensureLearningSemantics;
  window.ensureAllTermCoreDataLoaded = ensureAllTermCoreDataLoaded;
  window.ensureTerm03Semantics = ensureTerm03Semantics;
  window.ensureTermSemantics = ensureTermSemantics;
  window.ensureTermLoaded = ensureTermLoaded;
  window.ensureAllTermsLoaded = ensureAllTermsLoaded;
  window.ensureFeatureLoaded = ensureFeatureLoaded;
  window.getLoadedTermNumbers = () => [1, 2, 3].filter(term => loadedTerms.has(term));
})();
