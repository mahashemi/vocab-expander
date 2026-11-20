# Vocabulary audit baseline — 2026-11-20 (post-FA3 batch 03)

Generated from the successful all-term audit on content commit `e412653a1210d3fcb850fb10dc45affee38bcd03`. The report-generation workflow fix was subsequently merged in `479dcd36f0a4334b3d500fa41ea6e5642781718d`; it changes workflow path coverage only, not lexicon content.

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
| Vocabulary rows | 572 | 438 | 2,253 |
| Unique normalized headwords | 557 | 434 | 2,086 |
| Phrase entries | 169 | 283 | 1,112 |
| Source references | 574 | 438 | 2,712 |
| Verbs | 114 | 185 | 629 |

Term 03 source-reference distribution: FA3 1,358; KH3 573; N3 359; SH3 329. Term 03 also has 60 source chapters, 20 chapter summaries, 20 Khulasa summaries, 10 Newestan lessons and 20 speech prompts.

Term 01/02 source coverage: all expected source IDs are represented in their audited lexicons (69/69 and 60/60 respectively). Term 03 covers all 60 expected source IDs.

## Counting definitions

- **Vocabulary rows:** curated records loaded by the term audit, not raw OCR token counts.
- **Unique normalized headwords:** Persian-aware normalization removes whitespace/ZWNJ, tatweel and punctuation; Term 02/03 also normalize common Arabic/Persian yeh and kaf variants.
- **Phrase entries:** whitespace-containing entries plus records explicitly tagged as compound verbs or noun phrases. This is a structural metric, not a claim that every phrase is unique.
- **Source references:** source links retained on curated records; one record can cite multiple lessons, so this may exceed row count.
- **Verbs:** audited verb records (Term 03 reports verified verbs).

## FA3 reading-passage gap scan (candidate-only)

The refreshed report on main commit `479dcd36f0a4334b3d500fa41ea6e5642781718d` scanned all 20 FA3 OCR files (pages 2 onward), covering 1,615 paragraphs. It found 19 repeated unknown single-word candidates and 213 unmatched phrase candidates. These are review candidates, not approved vocabulary: OCR noise, inflectional fragments and context-dependent forms require manual checking before promotion. The workflow now regenerates and uploads this report on main when its scanner changes.

## Important interpretation

These figures measure curated, source-linked vocabulary and content structures. They do **not** mean every word or expression in the OCR has been captured. OCR-to-lexicon review remains ongoing: continue with the remaining FA3 candidates, then KH3/N3/SH3, followed by Term 02 (FA2/KH2/N2/SH2) and Term 01 (F1/Kh/N1/Sh1).

## Reproduction

Run the repository's all-term vocabulary audit workflow, or locally:
```sh
node tools/audit-term01.cjs
node tools/audit-term02.cjs
node tools/audit-term03.cjs
```

OCR originals are read-only inputs. Do not edit them to make audits pass.
