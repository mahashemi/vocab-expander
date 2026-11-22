# Vocab-Expander task board

Last updated: 2026-11-22  
Repository: [mahashemi/vocab-expander](https://github.com/mahashemi/vocab-expander)  
Live site: https://mahashemi.github.io/vocab-expander/

This is the persistent implementation board. Statuses reflect merged code and verified workflow results; an implementation is not marked complete merely because a change was proposed.

## Current sprint — performance, loading, and global search

| Priority | Work item | Status | Notes / next action |
|---|---|---|---|
| P0 | Repair performance report generation | In progress | Latest run failed because the report writer iterated `sample.longTasks`, but the browser metrics payload did not include that array. Fix is in this branch; rerun and verify artifact output. |
| P0 | Capture a valid cold/warm mobile + desktop baseline | Blocked by P0 | Run 44989426264 reached measurement but failed in report generation. Do not treat it as a baseline. Rerun after the fix; inspect portal and Term 03 direct-route measurements. |
| P1 | Reduce Term 03 initial JavaScript/payload cost without losing vocabulary or semantic coverage | Pending measurement | Use the valid baseline and file/resource breakdown first. Preserve all 46 semantic chunks, reviewed additions, cross-term deduplication, and learning features. |
| P1 | Make global search indexing faster and more reliable across Terms 01–03 and Verb Treasury | Pending | Audit index construction and repeated work; then design a persistent, versioned index with invalidation. Search must cover every term and Verb Treasury. |
| P1 | Move search work to a Web Worker if profiling justifies it | Conditional | Only do this if measured main-thread blocking/search latency warrants it. |
| P2 | Validate cold/warm navigation on real mobile and desktop browsers | Pending | Compare real-device behavior with synthetic measurements, especially refresh/deep-link restoration and first meaningful render. |

## Completed and merged

| Work item | Status | Evidence |
|---|---|---|
| Route-first rendering and direct-route refresh protection | Complete | Implemented in the deployed site; retain regression coverage. |
| Cross-term data isolation and shared loading order | Complete | Implemented; preserve while optimizing payloads. |
| Resource-level performance diagnostics | Complete | PR [#134](https://github.com/mahashemi/vocab-expander/pull/134): largest/slowest resources, transfer sizes, script loading, long-task diagnostics, cold/warm scenarios. |
| First-render vs last-rerender benchmark distinction | Complete | PR [#135](https://github.com/mahashemi/vocab-expander/pull/135): first Term 03 route-ready mark is reported separately from the last render mark. |
| Sukhanrani structure tiles after Qur'anic anchor | Complete | PR [#136](https://github.com/mahashemi/vocab-expander/pull/136): shared Term 02/03 renderer and responsive five-stage structure. |
| Prevent skipped workflow events cancelling valid performance runs | Complete | PR [#138](https://github.com/mahashemi/vocab-expander/pull/138): performance workflow concurrency no longer cancels an in-progress baseline. |
| Performance-report long-task array omission | Fix prepared; validation pending | This branch adds the missing `longTasks` array to each sample before report generation. |

## Cross-term learning-school backlog

| Priority | Work item | Status | Notes |
|---|---|---|---|
| P1 | Keep global search available across every term and Verb Treasury | Pending | Shared search experience; no term-specific gaps. |
| P2 | Add focused word-learning modes (including spelling/ imla practice) | Planned | One clear learning function per mode; evaluate skip-gram/context practice alongside spelling recall. |
| P2 | Ensure vocabulary cards count full phrases as well as headwords | Pending verification | Counts must reflect actual learnable entries, not just headword totals. |
| P2 | Continue Term 03 content improvements, then Term 01; keep Term 02 editable | Ongoing | OCR-derived additions should be reviewed and deduplicated; no term is permanently frozen. |

## Operating rules

1. Measure before optimizing; keep a before/after baseline.
2. Never reduce vocabulary, reviewed meanings, semantic coverage, or learning functionality to improve load time.
3. Keep changes cross-term where appropriate and test Terms 01, 02, and 03.
4. Use clean, focused pull requests and squash merges.
5. Update this board whenever a task changes state; distinguish **implemented**, **merged**, **deployed**, and **verified**.
