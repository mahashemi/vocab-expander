# Vocabulary audit baseline — 2026-11-20

Generated from the passing all-term audit workflow on main commit `e773e8e8aab20f6d36e1a51b93f89a16a0af5328`.

## OCR source inventory

| Term | OCR files | Source families |
|---|---:|---|
| Term 01 | 69 | F1: 20; Kh: 20; N1: 10; Sh1: 19 |
| Term 02 | 60 | FA2: 20; KH2: 20; N2: 10; SH2: 10 |
| Term 03 | 60 | FA3: 20; KH3: 20; N3: 10; SH3: 10 |
| **Total** | **189** | |

The absent Term 01 source `SH1-10` is intentionally excluded; it is not an outstanding recovery task.

## Curated vocabulary audit

| Metric | Term 01 | Term 02 | Term 03 |
|---|---:|---:|---:|
| Vocabulary rows | 572 | 438 | 2,234 |
| Unique normalized headwords | 557 | 434 | 2,067 |
| Phrase entries | 169 | 283 | 1,093 |
| Source references | 574 | 438 | 2,656 |
| Verbs | 114 | 185 | 610 |

Term 03 audit additionally reports:
- Source reference distribution: FA3 1,302; KH3 573; N3 359; SH3 329.
- Chapter/source coverage: 60 source chapters.
- 20 chapter summaries, 20 Khulasa summaries, 10 Newestan lessons and 20 speech prompts.

Term 01/02 source coverage: all expected source IDs are represented in their audited lexicons (69/69 and 60/60 respectively). Term 03 covers all 60 expected source IDs.

## Counting definitions

- **Vocabulary rows:** curated records loaded by the term audit, not raw OCR token counts.
- **Unique normalized headwords:** Persian-aware normalization removes whitespace/ZWNJ, tatweel and punctuation; Term 02/03 also normalize common Arabic/Persian yeh and kaf variants.
- **Phrase entries:** whitespace-containing entries plus records explicitly tagged as compound verbs or noun phrases. This is a structural metric, not a claim that every phrase is unique.
- **Source references:** source links retained on curated records; one record can cite multiple lessons, so this may exceed row count.
- **Verbs:** audited verb records (Term 03 reports `verifiedVerbs`).

## Important interpretation

These figures measure the currently curated, source-linked vocabulary and content structures. They do **not** mean every word or expression in the OCR has been captured. The OCR-to-lexicon gap-review process is ongoing, starting with FA3 reading passages and continuing across KH3/N3/SH3, then Term 02 and Term 01.

## Reproduction

Run the repository's all-term vocabulary audit workflow, or locally:
```sh
node tools/audit-term01.cjs
node tools/audit-term02.cjs
node tools/audit-term03.cjs
```

OCR originals are read-only inputs. Do not edit them to make audits pass.
