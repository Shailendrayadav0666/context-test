# Artifact Completeness Check — story-1.1

**Checked**: 2026-11-13T11:06:33Z · **AIRE version**: 1.0 · **Result**: CLEAN (SH-LOOP-16: 0 fix attempts)

| File | Required because | Present | Format OK | Consistent | Action taken |
|---|---|---|---|---|---|
| reports/unit-test-evidence/story-1.1/baseline-regression.log | E1 always | yes | yes | yes | none |
| reports/unit-test-evidence/story-1.1/unit-test-run.log | E1 always | yes | yes | yes (21/21) | none |
| reports/unit-test-evidence/story-1.1/coverage/ (lcov.info, cobertura, summary, lcov-report) | E1 always | yes | yes | yes | none |
| reports/unit-test-evidence/story-1.1/coverage/changed-lines-coverage.json | E1 gate metric | yes | yes | yes (29/29, 100.0% = eval.json unitCoverage) | none |
| reports/unit-test-evidence/story-1.1/full-regression.log | E1 always | yes | yes | yes (0 new) | none |
| reports/unit-test-evidence/story-1.1/test-placement-check.log | E1, dev-implement changed tests | yes | yes | yes | none |
| reports/unit-test-evidence/story-1.1/evidence-manifest.md | E1 always | yes | Section 2 skeleton | Status PASS = eval.json | none |
| reports/behavior-test-evidence/story-1.1/b1/ (run log, report json, manifest) | E2 b1 always | yes | yes | 10/10, 5/5 ACs = eval.json | none |
| reports/behavior-test-evidence/story-1.1/b3/ (run log, report json, manifest) | E2 b3 — last unit, B3 ran | yes | yes | 10/10 = eval.json | none |
| reports/playwright-test-evidence/story-1.1/ (playwright-test-run.log, playwright-test-report.json, evidence-manifest.md) | E4 — plan has Frontend Components Generation | yes | yes | 18/18 headed, 0 fixme = eval.json | none |
| tests/e2e/story-1.1-upgrade-to-premium-button-with-premium-details-modal/ (18 specs) | E4 outside reports/ | yes | yes | yes | none |
| spec/playwright-specs/story-1.1-upgrade-to-premium-button-with-premium-details-modal.md | E4 Planner plan | yes | yes | yes | none |
| spec/test-plans/story-1.1-upgrade-to-premium-button-with-premium-details-modal/automation-summary.md | E4 | yes | yes | yes | none |
| reports/eval-evidence/story-1.1/eval.json | E6 always | yes | all gate ids present, each PASS/N/A | verdict PASS | none |
| reports/eval-evidence/story-1.1/eval-summary.md | E6 always | yes | one row per gate | matches eval.json | none |
| reports/eval-evidence/story-1.1/static/ + static/baseline/ | E6 always | yes | D1, D3-D7 post and baseline outputs; D2 N/A | yes | none |
| reports/eval-evidence/story-1.1/judge/architecture-score.json · security-score.json | E6 always | yes | per-criterion, citations below 1.0 (pass 1 kept in judge/pass-1/) | J1 1.00 / J2 1.00 = eval.json = review v2 | none |
| reports/reviews/story-1.1-code-review-v1.md · v2.md | E7 always, every version kept | yes | template | v2 names security-review-v2 | none |
| reports/code-security-reviews/story-1.1-security-review-v1.md · v2.md | E8 always | yes | agent report structure, diff-scoped | yes | none |
| runtime-artifacts/stories/story-1.1/audit.md · state.md | E10 always | yes | yes | yes | none |

**N/A gates (no folder by design)**: D2_types — plain JavaScript; behaviorB2 — no other feature file; apiContract — no API Layer Generation step; playwrightRegression — tests/e2e/ held no spec at baseline. E3, E5, E9 (CI disabled) and E11 (epic story) are absent, as required.
