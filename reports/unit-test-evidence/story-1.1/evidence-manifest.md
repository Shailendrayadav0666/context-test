# Evidence Manifest — Unit tests + coverage — story-1.1

| Field | Value |
|---|---|
| Work unit | Story 1.1 — Upgrade to Premium button with Premium details modal |
| Branch / head | story/1.1-upgrade-to-premium-button-with-premium-details-modal @ 532e230 (uncommitted working tree) · base 532e230 |
| Generated | 2026-11-13T09:36:20Z |
| AIRE version | 1.0 |
| Status | PASS |

## Commands run
| # | Command | Working directory | Exit code |
|---|---|---|---|
| 1 | `npx vitest run --coverage --coverage.reporter=text --coverage.reporter=lcov --coverage.reporter=json-summary --coverage.reporter=cobertura` | src/frontend | 0 |
| 2 | `node changed-lines.mjs <repo> 532e230 coverage/lcov.info` (git diff --unified=0 intersected with lcov DA/BRDA) | repo root | 0 |
| 3 | `npx vitest run --passWithNoTests` (full regression, frontend) | src/frontend | 0 |
| 4 | `python -m pytest -q` (full regression, backend) | src/backend | 5 (no tests collected — same as baseline) |

## Tools
| Tool | Version |
|---|---|
| vitest | 5.1.0 |
| @vitest/coverage-v8 | 5.1.0 |
| @testing-library/react | 16.3.3 |
| node | 26.13.0 |
| pytest | 9.1.1 |

## Result
| Field | Value |
|---|---|
| Tests passed | 21/21 |
| Changed executable lines covered | 29/29 (100.0%) |
| Changed branches covered | 10/10 (100.0%) |
| Threshold | 90.0% |
| Whole-file coverage (not the gate metric) | Billing.jsx 100% lines / 100% branches · PremiumUpgradeModal.jsx 100% / 100% |
| Baseline pass/fail | frontend: 0 test files (exit 0) · backend: no tests ran (exit 5) |
| Post-change pass/fail | frontend: 21 passed / 0 failed · backend: no tests ran (exit 5, unchanged) |
| New failures | 0 |
| Test placement verdict | PASS — 0 violations (test-placement-check.log) |

## Artifacts
| File | What it is |
|---|---|
| unit-test-run.log | raw output of the final passing unit-test run |
| coverage/lcov.info · coverage/cobertura-coverage.xml | machine-readable coverage reports |
| coverage/coverage-summary.json · coverage/lcov-report/ | summary and HTML report |
| coverage/changed-lines-coverage.json | the gate metric (changed lines and branches) |
| baseline-regression.log | whole suite before any change |
| full-regression.log | whole suite after the change |
| test-placement-check.log | Step 6.3 placement check |

## Exceptions and notes
src/frontend/vitest.config.js coverage.include gained src/components/PremiumUpgradeModal.jsx so the new file is measured. Unit tests were re-run after the SH-LOOP-4 static fix (constants made module-private); figures are from that run.
