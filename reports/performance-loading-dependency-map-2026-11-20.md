# Website performance loading/dependency map

**Audit date:** 2026-11-20  
**Repository:** `mahashemi/vocab-expander`  
**Source:** `website/index.html`, `website/term-portal.js`, `website/verb-treasury.js`, term data/feature scripts and Git tree byte sizes  
**Main revision audited:** `c99c6e5efe9ac9e6b29371ccaf919777e716033a`

## Executive summary

The initial HTML references **96 external JavaScript files** in a fixed parser-execution order, plus one inline application bootstrap. The external files total **3,284,505 bytes (3.13 MiB) uncompressed** from Git tree sizes. The inline block is **170,250 JS characters**, approximately **203,104 UTF-8 bytes**. All 97 script tags are ordinary scripts without `defer` or `async`.

This is a source inventory, not a browser performance measurement. It does not establish actual transferred bytes, cache behavior, parse/evaluation time, FCP/LCP/INP/CLS or network waterfall timing. Browser profiling remains required.

## Initial JavaScript by functional group

| Group | Files | Uncompressed bytes | MiB |
|---|---:|---:|---:|
| Term 01 | 7 | 386,258 | 0.368 |
| Term 02 | 15 | 299,571 | 0.286 |
| Term 03 | 66 | 1,903,993 | 1.816 |
| Newestan shared/term features | 5 | 289,246 | 0.276 |
| Shared semantic data + portal/verb UI | 3 | 405,437 | 0.387 |
| **External total** | **96** | **3,284,505** | **3.133** |

The inline bootstrap is additional to these external totals. Term 03 accounts for approximately 58% of external JavaScript source bytes. Term 01 and Term 02 are also loaded on the initial HTML even when a learner has not selected them.

## Largest initial files

| File | Bytes |
|---|---:|
| `term03-lexicon-additions.js` | 663,917 |
| `semantic-meanings.js` | 384,426 |
| `term01-semantic-additions.js` | 217,522 |
| `term03-dedup.js` | 131,947 |
| `term02-lexicon-additions.js` | 105,567 |
| `newestan-language-lessons.js` | 101,283 |
| `newestan-essay-vocabulary.js` | 101,054 |
| `term03-data.js` | 81,847 |
| `term01-supplementary.js` | 81,153 |
| `term03-matn-verbs.js` | 56,882 |

## Observed execution/dependency chain

1. **Term data and additions first.** `term01-data.js`, `term02-data.js`, `term02-lexicon-additions.js`, chapter/supplementary files, `term03-data.js` and `term03-lexicon-additions.js` populate `window.TERM1_DATA`, `window.TERM2_DATA` and `window.TERM3_DATA`.
2. **Term 03 transformations and feature data.** Ordered Term 03 additions, mappings, speeches, Khulasa and Newestan data scripts run before the app bootstrap. `term03-dedup.js` must run after Term 03 additions and before the inline app builds its `BOOKS` object.
3. **Shared semantic data.** `semantic-meanings.js` and term-specific semantic additions populate semantic maps before the app's `semanticFor()` and `toItem()` use them.
4. **Inline application bootstrap.** The large inline script defines `BOOKS` from the already-loaded term arrays, creates the shared `all()` vocabulary accessor, initializes progress/local storage, builds chapter selectors, and calls `fillBk(); render();`. It also embeds BOOK2 seed vocabulary and the main reading/practice UI.
5. **Verb Treasury.** `verb-treasury.js` is loaded after the inline block because it uses the app's `all()` function and other app globals; it exposes `window.verbTreasury`.
6. **Portal and global search.** `term-portal.js` runs last. It uses `all()`, `done`, `render()`, navigation helpers and the verb search API. It initializes the portal and applies direct hash routes.

### Why naive deferral is unsafe

- The inline bootstrap constructs `BOOKS={1:window.TERM1_DATA,2:BOOK2.concat(window.TERM2_DATA),3:window.TERM3_DATA}`. Term arrays must exist before the bootstrap unless the architecture changes.
- The app's initial `fillBk()` calls `all()`, which reads all three books.
- Portal initialization calls `all()` for overall progress and each term's entry counts.
- Global search builds its index from `all()` and Verb Treasury search rows.
- Verb Treasury also reads `all()`.
- Newestan and Khulasa functions expect feature data/globals when their tabs are opened.

Simply adding `defer` or `async` to the current tags would break the existing execution order: the inline bootstrap is not deferred and expects preceding global scripts to have executed. `async` would also make execution order nondeterministic.

## Recommended target architecture

### Stage A — Separate the lightweight portal shell from learner payloads

- Keep a small boot shell responsible for theme, route parsing, portal layout and a compact precomputed term-summary manifest.
- Do not construct the full three-term `BOOKS` array on the home view.
- Use a compact manifest for term totals and progress counts. Count progress by stable term-prefixed IDs only after validating all historical stored IDs.
- Preserve `#/ `, `#/verbs` and existing `#/term/{1|2|3}/...` routes. Direct term routes request the required payload before rendering.

### Stage B — Load term payloads on demand

- Term 01 entry loads Term 01 core lexicon and minimum shared semantic data.
- Term 02 entry loads Term 02 core lexicon and additions.
- Term 03 entry loads Term 03 core lexicon/additions and its dedup/mapping layer in the required order.
- Load Khulasa, Sukhanrani, Newestan and other feature data only when the corresponding feature is opened.
- Keep canonical vocabulary identity and source references shared; this is a loading change, not separate definitions.

### Stage C — Treat global search and Verb Treasury as explicit payload requests

- Keep search visible on the portal.
- On first non-empty query, load a compact prebuilt all-term search index (or progressively load term indexes); do not hydrate every full lesson/semantic object just to display portal counts.
- On opening Verb Treasury, load its required verb rows and shared verb metadata.
- Search results must link to the exact term, chapter and canonical vocabulary card.

### Stage D — Cache and verify

- Use stable/versioned filenames for generated chunks where feasible on GitHub Pages; preserve safe HTML revalidation.
- Add loading/error/retry handling and prevent duplicate concurrent script loads.
- Verify direct routes, browser refresh, search, flashcards, Verb Treasury, Newestan, Khulasa, Sukhanrani, progress persistence and offline-friendly behavior.
- Add repeatable size budgets and regression reports.

## Safe implementation sequence

1. Add characterization tests for current data globals, script order, route behavior, global search and progress IDs.
2. Generate a machine-readable resource manifest and compact portal summary from audited lexicons.
3. Extract the inline bootstrap to a standalone file without changing behavior (characterization-only refactor).
4. Introduce a loader with explicit dependencies and sequential loading; do not use unordered `async`.
5. Move term-specific data behind the loader one term at a time, starting with the largest Term 03 payload only after the shared shell works without it.
6. Lazy-load feature modules separately.
7. Measure actual cold/warm browser behavior before and after each stage.

## Safeguards

- Do not remove vocabulary, meanings, examples or OCR source references to reduce bytes.
- Do not edit OCR originals or split canonical identity into separate term stores.
- Do not mark performance complete based on source size alone.
- Do not add `defer`/`async` indiscriminately.
- Do not regress route retention, deep links, search, progress or offline-friendly behavior.
