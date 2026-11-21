# Vocabulary Learning School — Architecture Contract

**Status:** P0 design baseline  
**Scope:** Term 01, Term 02, Term 03, every book, words and multiword expressions  
**Separate from:** Newestan writing instruction (essay/paragraph/research-writing curriculum)

## 1. Product principle

The school teaches learners to remember and correctly write the Persian vocabulary they have studied. It is not a second dictionary, a random quiz generator, or a replacement for Newestan. Every activity is a distinct learning mode with its own teaching and interaction logic; all modes share one vocabulary identity model and one learner-progress model.

The first release should expose **Imla (املاء)** and **Skip-gram** as independent modes. Other modes can be registered later without changing the item model or progress schema.

## 2. Existing data inventory

The current app normalizes heterogeneous textbook records through `toItem()` in `website/app-bootstrap.js`.

| Source | Current record shape (representative fields) |
|---|---|
| Term 01 | Object rows: `unit`, `source`, `fa`, `tr`, `en`, `pos`, `ex`; optional `sources`, `ms`, `amr`, `m`, `a`, `note`, `extraExamples`, `extraNotes` |
| Term 02 | Mixed array and object rows. Array form: `[unit, fa, tr, en, exampleFa, exampleTr, exampleEn]`; object form includes `unit`, `units`, `source`, `fa`, `tr`, `en`, `pos`, `ms`, `amr`, `ex`, `m`, `a` |
| Term 03 | Object rows with `unit`, `source`, `fa`, `tr`, `en`, `pos`, examples and optional verb fields; reviewed additions and semantic layers extend these records |
| Shared adapter | `bk`, `ch`, `units`, `sources`, `xf/xt/xe`, `sem`, and an `id` |

The source records contain both single words and phrases/compound verbs. The learning layer must retain this distinction and all chapter/source occurrences.

### Existing identity behavior — do not silently replace it

- Object-row fallback IDs are currently `book|unit|source|Persian-headword`.
- Array-row fallback IDs are currently `book|unit|Persian-headword`.
- Term 02's runtime aggregation folds duplicate headwords, retains the first row's ID, and combines its `sources` and `units`.
- Custom vocabulary is read from `persian_custom_v2` (with a legacy `persian_custom_v1` fallback).
- Memorisation completion is a Set of legacy item IDs stored in `persian_done_v1`.
- Existing Term 03 deduplication/progress migration is covered by browser regression tests; retain that behavior.

These are legacy runtime IDs, not a complete cross-term canonical identity contract. Do not change their generation in place.

## 3. Canonical vocabulary identity

Introduce a versioned, explicit identity manifest. It is an index over existing source records, not a rewrite of the OCR or textbook data.

A canonical item must have:

- `itemId`: stable, explicitly assigned ID that does not depend on array position, load order, or whichever duplicate row loads first.
- `headword`: preferred Persian display form, preserving original orthography and spacing.
- `acceptedForms[]`: reviewed spelling variants with a reason/source; never infer variants from fuzzy similarity alone.
- `kind`: `word`, `phrase`, `compound-verb`, or another reviewed lexical category.
- `occurrences[]`: term, book, chapter/unit, legacy runtime ID, source ID(s), and source-confidence/review state.
- `meanings`: available Persian, English and Arabic meanings; missing or uncertain fields remain explicitly missing/uncertain.
- `examples[]`: source-attested or reviewed contextual examples, each with language/transliteration and provenance.
- Optional POS, masdar, amr, inflection, audio reference and editorial notes.

**Identity rule:** never merge records solely because their normalized strings look alike. Homographs, distinct senses, phrases, and context-dependent entries may require separate canonical items. Cross-term equivalence is explicit and reviewable. A canonical item can have many occurrences; it does not erase those occurrences.

**Legacy mapping:** maintain `legacyIds[]` (or a separate alias index) from every current runtime ID to exactly one canonical item. If a legacy ID is ambiguous, block automatic migration and report it for review. The manifest must be deterministic and load-order independent.

## 4. Progress and migration contract

Keep the existing completion store readable. Do not delete or rewrite `persian_done_v1` as part of the first implementation.

Add a separate, versioned learning-attempt store, initially local to the browser. Proposed logical records:

```js
{
  eventId,             // unique event identity
  itemId,              // canonical vocabulary identity
  modeId,              // e.g. "imla" or "skip-gram"
  occurredAt,           // ISO timestamp
  correct,              // boolean
  response,             // learner response, with privacy-conscious retention
  errorTypes: [],       // e.g. omitted-letter, substitution, spacing, variant
  errorPositions: [],   // grapheme positions, not raw UTF-16 offsets
  hintsUsed: 0,
  elapsedMs: null,
  confidence: null,     // optional learner self-rating
  promptVersion: 1
}
```

Aggregate state is derived per `itemId + modeId`: attempts, accuracy, hint rate, recurring error families, recent performance, mastery evidence and next review date. One correct guess must never mark an item mastered.

Migration must be idempotent:
1. Read legacy completion IDs without mutating the source store.
2. Resolve each ID through the explicit alias map.
3. Preserve completion if and only if its mapping is unambiguous.
4. Record migration version and a reconciliation summary.
5. Keep unknown/ambiguous IDs available for diagnosis; never discard them silently.
6. Test clean profiles, returning learners, repeated migration, duplicate aliases and unmapped IDs.

Do not promise cross-device synchronization until a supported account-backed store exists. Browser refresh and route changes must preserve local progress.

## 5. Learning-mode registry contract

Each mode is a separate module. The registry chooses modes; it does not implement their pedagogy.

Suggested interface:

```js
{
  id,
  title,
  eligible(item, context),             // explainable reason/result
  createPrompt(item, learnerState, rng),
  validate(item, response, prompt),     // accepted/rejected + error classification
  getHints(item, prompt, attempt),
  score(item, validation, attempt),
  feedback(item, validation, attempt),  // teaching, not just right/wrong
  recordAttempt(event)                  // delegates to shared progress service
}
```

- Prompt creation must be reproducible with a supplied seeded random source.
- Each mode owns its prompt, interaction, validation, hints, scoring, difficulty and instructional feedback.
- Shared services own identity, attempt history, error aggregation, persistence and revision scheduling.
- Every mode declares why an item is eligible/ineligible; the UI should not show meaningless activities.

## 6. First two independent modes

### Imla (املاء)

**Purpose:** retrieve and type the complete Persian spelling from a meaning or contextual cue.

- Prompt from a reviewed Persian/English/Arabic meaning or a source-attested sentence with the target removed.
- Verified audio may be used only when a real audio source is explicitly linked to the item. No synthetic or guessed audio may be represented as textbook pronunciation.
- Validate against the preferred headword and reviewed accepted forms.
- Explain spelling/spacing errors, show the correct form and meaning, and return the learner to a natural contextual example.
- Record error classes such as substitution, omission, insertion, transposition, spacing/ZWNJ, and unaccepted variant.

### Skip-gram

**Purpose:** reconstruct a word or phrase from progressively hidden letters.

- Select eligible grapheme clusters; do not split combining marks from their base letter.
- Difficulty grows from one blank to multiple blanks and full reconstruction, based on item length and learner evidence.
- Reveal progressive hints (meaning, context, initial/final letter, then additional letters).
- Support keyboard entry and tap-to-fill alternatives; never require drag-and-drop.
- Preserve phrase boundaries and punctuation. Do not hide spaces/ZWNJ as if they were ordinary letters.
- Use the same reviewed accepted-form validation as Imla.

## 7. Eligibility and future modes

The resolver should consider script, word/phrase length, reviewed spelling confidence, accepted variants, meaning quality, contextual example availability, confusable-letter evidence and verified audio availability.

Future registry modules may include:

- Confusable-letter discrimination (only when a defensible contrast exists in context).
- Letter/syllable sequencing and full-word reconstruction.
- Meaning-to-word retrieval.
- Contextual sentence completion.
- Listening dictation, only for verified audio.

Do not generate exercises for every item by force. A phrase may be suitable for Imla and contextual retrieval but not for letter-family discrimination.

## 8. Accessibility and UX

- RTL-first, mobile-first and keyboard accessible.
- Every touch interaction has a keyboard/tap alternative.
- Keep the existing central vocabulary detail/flashcard as the canonical item-information view; practice modes link back to it rather than duplicating a second dictionary.
- No separate “My Words” navigation tab. Integrate practice and revision into the existing learning navigation.
- Provide focused practice filters: all terms, a selected term, book/chapter, due reviews, weak items and (later) letter family.
- Show term/book/chapter/source context without overwhelming the exercise.

## 9. Delivery sequence and acceptance gates

### P0 — design and safety
- [x] Inspect the three source schemas, shared adapter, current ID generation, local completion store and lazy-loader ordering.
- [x] Record the canonical identity, legacy alias and progress migration constraints.
- [x] Finalize the initial manifest schema and representative Term 01/02/03 fixtures, including a phrase, explicit aliases, ambiguous aliases and invalid-manifest behavior. Full live-source fixture coverage remains a follow-up.
- [x] Specify and test the legacy-ID alias map without changing current IDs.

### P1 — shared foundation
- [x] Read-only manifest validator and legacy alias resolver. Live source-row manifest builder is still pending.
- [x] Independent mode eligibility checks for Imla and Skip-gram; shared explainable registry remains pending.
- [x] Independent Imla and Skip-gram APIs with deterministic Skip-gram masks and unit tests.
- [x] Separate local attempt event store with correctness, error categories, hints and elapsed time. Canonical-ID migration is pending and legacy completion remains untouched.

### P1 — first modes
- [x] Imla module and independent tests.
- [x] Skip-gram module and independent tests.
- [x] Mobile-responsive practice UI, keyboard submission, term filters and persistent route. Central flashcard deep-link integration remains a follow-up.

### P2 — retention and additional modes
- [ ] Confusable letters, reconstruction, meaning retrieval and contextual completion.
- [ ] Mistake notebook, evidence-based difficulty and spaced revision.
- [ ] Cross-term practice summaries.

### P3 — audio
- [ ] Listening dictation only for verified audio sources.

**Release gates:** representative words and phrases from every term/book; deterministic and explainable mode choice; independent tests for prompt/validation/variants/hints/scoring/progress; refresh-safe progress; safe legacy migration; no invented OCR data; all term audits, browser regressions and performance budgets pass.

## 10. Non-negotiable safeguards

- OCR originals are read-only.
- Do not auto-promote OCR candidates or unverified spellings.
- Do not silently normalize away orthographic distinctions in learner answers.
- Do not conflate spelling practice with Newestan writing instruction.
- Do not create separate per-term learning engines.
- Do not regress global search, route/deep-link behavior, central vocabulary cards, Verb Treasury, or existing saved progress.
- Keep performance lazy-loading: the school and its mode modules must load only when the learner opens practice.
