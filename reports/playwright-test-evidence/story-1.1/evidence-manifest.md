# Evidence Manifest — Playwright UI automation — story-1.1

| Field | Value |
|---|---|
| Work unit | Story 1.1 — Upgrade to Premium button with Premium details modal |
| Branch / head | story/1.1-upgrade-to-premium-button-with-premium-details-modal @ 532e230 (uncommitted working tree) · base 532e230 |
| Generated | 2026-11-13T10:50:54Z |
| AIRE version | 1.0 |
| Status | PASS |

## Commands run
| # | Command | Working directory | Exit code |
|---|---|---|---|
| 1 | `npx playwright test tests/e2e/seed.spec.ts --headed` (Seed Test Gate) | repo root | 0 |
| 2 | `npx playwright test tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/ --headed --reporter=list` (Step 4 pre-heal run) | repo root | 0 |
| 3 | `PLAYWRIGHT_JSON_OUTPUT_NAME=reports/playwright-test-evidence/story-1.1/playwright-test-report.json npx playwright test tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/ --headed --reporter=list,json` (authoritative evidence run) | repo root | 0 |

## Tools
| Tool | Version |
|---|---|
| @playwright/test | 1.65.0 (workspace root) |
| browser | Chromium (Playwright-managed, project "chromium" / Desktop Chrome) |
| Playwright test agents | playwright-test-planner · playwright-test-generator · playwright-test-healer (init-agents, playwright-test MCP server) |
| node | v26.13.0 |

## Result
| Manual TC | Generated spec | Result |
|---|---|---|
| TC-A11Y-01 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-a11y-01-open-with-keyboard.spec.ts | Passed |
| TC-A11Y-02 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-a11y-02-focus-moves-into-dialog.spec.ts | Passed |
| TC-A11Y-03 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-a11y-03-named-modal-dialog.spec.ts | Passed |
| TC-A11Y-04 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-a11y-04-escape-closes-focus-returns.spec.ts | Passed |
| TC-A11Y-05 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-a11y-05-cancel-close-return-focus.spec.ts | Passed |
| TC-A11Y-06 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-a11y-06-zoom-200-and-contrast.spec.ts | Passed |
| TC-E2E-01 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-e2e-01-button-shown-active-plan.spec.ts | Passed |
| TC-E2E-02 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-e2e-02-button-hidden-no-plan.spec.ts | Passed |
| TC-E2E-03 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-e2e-03-button-hidden-while-loading.spec.ts | Passed |
| TC-E2E-04 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-e2e-04-open-modal-premium-details.spec.ts | Passed |
| TC-E2E-05 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-e2e-05-continue-coming-soon-keeps-standard.spec.ts | Passed |
| TC-E2E-06 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-e2e-06-cancel-dismisses-no-change.spec.ts | Passed |
| TC-E2E-07 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-e2e-07-close-dismisses-no-change.spec.ts | Passed |
| TC-E2E-08 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-e2e-08-repeated-open-close-cycles.spec.ts | Passed |
| TC-SEC-01 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-sec-01-no-network-request.spec.ts | Passed |
| TC-SEC-02 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-sec-02-continue-no-account-change.spec.ts | Passed |
| TC-SEC-03 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-sec-03-billing-behind-sign-in.spec.ts | Passed |
| TC-SEC-04 | tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/tc-sec-04-fail-safe-billing-load-error.spec.ts | Passed |

| Field | Value |
|---|---|
| Specs passed | 18/18 (pre-heal run 18/18; evidence run 18/18, 0 flaky) |
| Headed | yes |
| `test.fixme()` count | 0 |
| Healer | not invoked — no failing spec |

## Artifacts
| File | What it is |
|---|---|
| playwright-test-run.log | raw output of the authoritative headed run (list reporter) |
| playwright-test-report.json | Playwright JSON report of the same run |
| playwright-test-run-pre-heal.log | raw output of the Step 4 first headed run |
| ../../../tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/*.spec.ts | the 18 generated specs (Generator output) |
| ../../../spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md | Planner plan |
| ../../../spec/test-plans/story-1.1-upgrade-to-premium-button-with-premium-details-modal/automation-summary.md | automation summary |

## Exceptions and notes
Two full headed runs, both 18/18: the Step 4 run used the list reporter only, so it produced no JSON report; one more headed run was made with list+json to write playwright-test-report.json (no healing happened between them). App servers on 8000/5173 were the operator's own already-running processes, reused via webServer reuseExistingServer — not started or stopped by this run. Advisory (not a gate failure, outside the approved contract): the dialog has no focus trap — Tab past Continue leaves the dialog (observed by the TC-A11Y-02 Generator); REQ-NF-03/AC-2/AC-4 require focus-in, focus-return and Escape only, all passing.
