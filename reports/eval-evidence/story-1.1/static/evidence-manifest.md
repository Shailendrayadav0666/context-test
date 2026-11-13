# Evidence Manifest — Static Eval D1–D7 — story-1.1

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
| 1 | `npx oxlint -f json src` (repo's own .oxlintrc.json) | src/frontend | 0 |
| 2 | — (D2 N/A) | — | — |
| 3 | `semgrep scan --config p/javascript --config p/react --config p/security-audit --metrics off --json -o reports/eval-evidence/story-1.1/static/d3-semgrep.json src/frontend/src` | repo root | 0 |
| 4 | `npm audit --json` | src/frontend | 0 |
| 5 | `npx --yes license-checker@25.0.1 --production --json` | src/frontend | 0 |
| 6 | `npx oxlint -c ../../tests/.evals/static/oxlint-complexity.json -f json src` | src/frontend | 0 |
| 7 | `gitleaks dir <copy of the 50 changed/added files> --config .gitleaks.toml --report-format json` (file list: d7-scanned-files.txt) | repo root | 0 |

## Tools
| Tool | Version |
|---|---|
| oxlint | 1.93.0 |
| semgrep | 1.127.0 |
| npm (audit) | 11.20.0 |
| license-checker | 25.0.1 |
| gitleaks | 8.21.2 |

## Result
| Gate | Tool | Baseline findings | Post-change findings | NEW on changed files | Threshold | Status |
|---|---|---|---|---|---|---|
| D1 Lint | oxlint | 3 warnings (AuthContext.jsx) | 3 warnings (same, AuthContext.jsx) | 0 | new errors ≤ 0 | PASS |
| D2 Type check | — | — | — | — | 0 errors | N/A — project is plain JavaScript (.jsx); no type checker applies to this stack |
| D3 Static security | semgrep | 0 | 0 (12 files scanned) | 0 | 0C / 0H / ≤5M | PASS |
| D4 Dependencies | npm audit | 0 | 0 (0C / 0H / 0M) | 0 | 0C / 0H | PASS |
| D5 Licences | license-checker | 8 pkgs, 0 disallowed | 8 pkgs (MIT, UNLICENSED = the private app), 0 disallowed | 0 | none of GPL-2.0/GPL-3.0/AGPL-3.0/SSPL-1.0 | PASS |
| D6 Complexity | oxlint eslint/complexity max 12 | 0 | 0 functions over 12 | 0 | ≤ 12 | PASS |
| D7 Secrets | gitleaks | 0 | 0 | 0 | 0 | PASS |

## Artifacts
| File | What it is |
|---|---|
| d1-lint.json | oxlint JSON output |
| d3-semgrep.json · d3-semgrep.stderr.log | semgrep JSON output and its stderr |
| d4-npm-audit.json | npm audit JSON |
| d5-licenses.json | license-checker JSON |
| d6-complexity.json | oxlint complexity-rule JSON |
| d7-gitleaks.json · d7-scanned-files.txt | gitleaks JSON report and the exact file set scanned |
| delta-summary.json | baseline vs post-change delta, matched on (rule-id, file, message) |
| baseline/ | pre-change output of the same tool set (captured 2026-11-13T09:02:55Z) |

## Exceptions and notes
SH-LOOP-4 attempt 1: the first post-change run had 0 blocking findings but 2 non-blocking new ones, both fixed in code: (a) D1 warning react(only-export-components) on PremiumUpgradeModal.jsx, caused by exporting a constant beside the component; the constants in PremiumUpgradeModal.jsx and Billing.jsx were made module-private. (b) D4: 4 moderate advisories (GHSA-g3hv-75wg-m249, minimatch <11.0.1 ReDoS) pulled in by the new devDependency @amiceli/vitest-cucumber via ts-morph -> @ts-morph/common. Fixed with a scoped npm override (src/frontend/package.json overrides: @ts-morph/common -> minimatch ^11.0.1), so npm audit now reports 0. Nothing was suppressed. Unit, behaviour (image rebuilt), regression and all of D1–D7 were re-run after the fix; the results above are from that re-run.
