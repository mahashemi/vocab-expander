# Vocab Expander

A source-grounded Persian vocabulary and learning platform for Terms 01, 02 and 03.

**Live website:** https://mahashemi.github.io/vocab-expander/

The project turns vocabulary and learning material from the three course terms into a searchable, trilingual study environment. It supports both quick reference and structured practice.

## Learning areas

- **Vocabulary:** Persian headwords and phrases with English and Arabic meanings, examples, source references, and inflectional forms.
- **Global search:** Search across all three terms, including phrases, aliases, spelling variants, examples, and verb forms.
- **Learning School:** Canonical vocabulary identities shared across terms, with persistent practice history and review progress.
- **Imla:** Spelling practice grounded in words attested in the course materials.
- **Skip-gram:** Contextual word learning and reconstruction practice.
- **Verb Treasury:** Masdar, amr and related forms with validation.
- **Writing and speaking:** Newestan essay workshops, Khulasa, and Sukhanrani materials.

## Content principles

- Preserve source wording and source/unit attribution; do not invent vocabulary or examples.
- Keep Term 01, Term 02 and Term 03 as separate source collections while sharing canonical identities for genuinely identical vocabulary.
- Treat OCR text as source material to curate and validate, not as automatically correct final content.
- Keep all-term workflows complete: global search, Verb Treasury and Learning School must load the full relevant corpus before reporting complete results.
- Preserve the existing term-specific learning flows while making shared practice progress consistent across terms.

## Performance and loading

The site is a static GitHub Pages application. Term data and learning modules are loaded on demand.

- A term's core content should render before optional semantic enrichment.
- Term 01/02 semantic dictionaries are scheduled after the first render; complete-library workflows still await them.
- Term 03 retains its chapter-oriented loading and semantic-enrichment flow.
- Browser performance checks report first route render separately from semantic readiness, so improvements can be measured without hiding later work.

### Recorded cold-route baseline

The following measurements are the pre-deferred-semantics chapter-route baseline from [run #46055251415](https://github.com/mahashemi/vocab-expander/actions/runs/46055251415). They are reference values, not current post-optimization claims.

| Route | Mobile cold LCP | Mobile transfer | Requests |
|---|---:|---:|---:|
| Term 01, chapter 1 | 3.40 s | 526,892 B | 14 |
| Term 02, chapter 1 | 3.35 s | 499,944 B | 20 |

The next baseline records both first-render and semantic-ready timings after the deferred-loading change.

## Development checks

The repository's GitHub Actions validate source data, term curriculum scripts, learning modules, Newestan workshops, browser loading behavior, and performance budgets.

Useful local checks:

```bash
node tools/test-performance-budgets.cjs
node tools/test-performance-long-tasks.cjs
node tools/test-lazy-loading.cjs
```

The browser tests require Playwright/Chromium and a deployed site URL; CI supplies these automatically.

## Project tracking

- [Roadmap and learning-school issue #67](https://github.com/mahashemi/vocab-expander/issues/67)
- [Performance and loading issue #85](https://github.com/mahashemi/vocab-expander/issues/85)
