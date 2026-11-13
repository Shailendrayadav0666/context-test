# Story 1.1 — Code Generation Plan

**Story**: 1.1 — Upgrade to Premium button with Premium details modal (Tracker ID: LOCAL)
**Branch**: story/1.1-upgrade-to-premium-button-with-premium-details-modal (cut from epic/upgrade-to-premium-button)
**Dependencies**: requires none · enables none
**Covers**: REQ-F-01..05, REQ-NF-01..05
**Inputs**: spec/plans/epic-brief.md, spec/plans/requirements.md, spec/plans/stories.md, spec/plans/architecture.md (ARCH-01..05), spec/behavior/story-1.1.feature, spec/plans/code-structure.md
**Design reference**: none covers this component (`## Design References` is empty; no Reconciliations). UI/UX Mockups disabled — Step 1.6 standards N/A.
**Code root**: src/ (brownfield, frontend at src/frontend). **Tests**: repo-root tests/ only.
**Interfaces**: no API change; Billing.jsx keeps consuming `GET /api/billing` unchanged. No database entities.

This plan is the single source of truth for Part 2.

## Steps

- [x] **Step 1 — Business Logic Generation**: N/A — no business logic (static content, UI state only). Business Logic Summary: N/A.
- [x] **Step 2 — API Layer Generation**: N/A — no endpoint added or changed (REQ-NF-01, ARCH-01). API Layer Summary: N/A.
- [x] **Step 3 — Repository Layer Generation**: N/A — no data access. Summary: N/A.
- [x] **Step 4 — Frontend Components Generation** (REQ-F-01..05, REQ-NF-02, REQ-NF-03, REQ-NF-05; AC-1..AC-4):
  - [x] 4a. New `src/frontend/src/components/PremiumUpgradeModal.jsx` — presentational dialog (props `open`, `onContinue`, `onClose`, `returnFocusRef`); static Premium details constant ($30/month; Ultra HD (4K); Watch on 4 devices at once; Download on 6 devices; Ad-free streaming; Spatial audio); `role="dialog"`, `aria-modal="true"`, `aria-labelledby` -> "Upgrade to Premium" heading; focus moved into the dialog on open; Escape closes; Close (aria-label "Close"), Cancel and Continue buttons; no fetch, no useAuth, no router (ARCH-02, ARCH-04, REQ-NF-05 — plain text rendering only). (REQ-F-03, REQ-F-05, REQ-NF-03; AC-2, AC-4)
  - [x] 4b. Modify `src/frontend/src/pages/Billing.jsx` — in the active-plan branch only, add an "Upgrade to Premium" button with class `btn` next to the plan/price row; own `showUpgrade` and `upgradeMessage` state; Continue closes the modal and shows "Premium upgrades are coming soon"; Cancel/Close/Escape close and return focus to the button; plan badge stays Standard; no new network call (ARCH-01, ARCH-03, ARCH-05). (REQ-F-01, REQ-F-02, REQ-F-04, REQ-NF-01, REQ-NF-02; AC-1, AC-3, AC-4, AC-5)
  - [x] 4c. Modify `src/frontend/src/App.css` — styles for the upgrade button placement, modal overlay/panel, feature list, actions and coming-soon notice, using the existing palette (white surface, #0f766e teal, rounded corners). (REQ-NF-02; AC-1, AC-2)
- [x] **Step 5 — Frontend Components Summary**: list files changed and how each AC is met.
- [x] **Step 6 — Database Migration Scripts**: N/A — no data models.
- [x] **Step 7 — Unit Test & Coverage** (REQ-NF-04; AC-1..AC-5): `tests/unit/frontend/pages/Billing.test.jsx` and `tests/unit/frontend/components/PremiumUpgradeModal.test.jsx` with Vitest + Testing Library; fetch mocked; asserts visibility rules, dialog semantics, details, Continue/Cancel/Close/Escape, focus return, and no extra fetch calls. Coverage on changed files >= 90% (`unitTestCoverageMin`).
- [x] **Step 8 — Behavioural Test Gate B1/B2/B3** (AC-1..AC-5): step definitions in `tests/behavior/steps/` bound to the public UI surface, executing `spec/behavior/story-1.1.feature`; B2 = other feature files (none active); B3 = last work unit (1.1 is the only unit) — `spec/behavior.feature` has no scenarios by design.
- [x] **Step 9 — API & Contract Testing Gate**: N/A — no API Layer Generation step.
- [x] **Step 10 — Test Placement Verification**: all new tests under `tests/unit/frontend/` mirroring `src/frontend/src/`, step definitions under `tests/behavior/steps/`, none under `src/`.
- [x] **Step 11 — Full Regression vs Baseline**: re-run the whole suite and diff against `baseline-regression.log`.
- [x] **Step 12 — Static Eval Gate D1–D7**: re-run and diff against the static baseline.
- [x] **Step 13 — Playwright Readiness** (frontend step present): runner, browsers, Playwright official test agents.
- [x] **Step 14 — Playwright UI Automation**: `playwright-implement` in workflow mode, `--headed`, specs in `tests/e2e/story-1.1-.../`.
- [x] **Step 15 — Playwright E2E Regression**: N/A at baseline (tests/e2e/ empty) — re-run only this story's new specs as part of Step 14.
- [x] **Step 16 — Documentation Generation** (user instruction: create a README for the code): replace the Vite template `src/frontend/README.md` with a project README (what StreamPlex frontend is, how to run/test, the Plan and Billing page and the Upgrade to Premium button behaviour).
- [x] **Step 17 — Deployment Artifacts Generation**: N/A — no deployment change.

## Trace Summary (REQ/AC -> plan steps)

| REQ / AC | Plan steps |
|---|---|
| REQ-F-01 | 4b, 7, 8, 14 |
| REQ-F-02 | 4b, 7, 8, 14 |
| REQ-F-03 | 4a, 7, 8, 14 |
| REQ-F-04 | 4b, 7, 8, 14 |
| REQ-F-05 | 4a, 4b, 7, 8, 14 |
| REQ-NF-01 | 2, 4b, 7, 8 |
| REQ-NF-02 | 4b, 4c |
| REQ-NF-03 | 4a, 7, 8 |
| REQ-NF-04 | 7 |
| REQ-NF-05 | 4a, 12 |
| AC-1 | 4b, 4c, 7, 8, 14 |
| AC-2 | 4a, 4c, 7, 8, 14 |
| AC-3 | 4b, 7, 8, 14 |
| AC-4 | 4a, 4b, 7, 8, 14 |
| AC-5 | 4b, 7, 8 |

Trace completeness self-check: 10/10 REQ-IDs and 5/5 ACs appear in at least one step — PASS.
