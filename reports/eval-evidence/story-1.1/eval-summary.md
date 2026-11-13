### Eval Scorecard — Story 1.1 · **PASS**

| Gate | Result | Threshold | Status |
|---|---|---|---|
| D1 Lint | 0 new findings | ≤ 0 delta | PASS |
| D2 Type check | plain JavaScript — no type checker for this stack | 0 | N/A |
| D3 Static security | 0C / 0H / 0M new | 0C / 0H | PASS |
| D4 Dependencies | 0C / 0H | 0C / 0H | PASS |
| D5 Licences | 0 violations | none disallowed | PASS |
| D6 Complexity | 0 functions over threshold | ≤ 12 | PASS |
| D7 Secrets | 0 findings | 0 | PASS |
| Unit coverage | 100.0% (29/29 changed lines) | ≥ 90.0% | PASS |
| Behavioural B1 (this story) | 10/10 scenarios · 5/5 ACs · podman | 100% | PASS |
| Behavioural B2 (cumulative) | no other feature file in spec/behavior/ | other units only | N/A |
| Behavioural B3 (epic scope) | 10/10 scenarios · last and only unit · podman | last unit only | PASS |
| API & contract | no API layer step in the plan | all applicable | N/A |
| Playwright UI automation | 18/18 specs · headed · 0 fixme | 100% | PASS |
| Playwright E2E regression | tests/e2e/ held no spec at baseline | 0 new | N/A |
| Regression | 0 new failures | 0 | PASS |
| J1 Architecture | 1.00 | ≥ 0.85 | PASS |
| J2 Security (OWASP 2025) | 1.00 | ≥ 0.85 | PASS |

**J1 breakdown**: ARCH-01 1.00 (w 0.3) · ARCH-02 1.00 (w 0.25) · ARCH-03 1.00 (w 0.2) · ARCH-04 1.00 (w 0.15) · ARCH-05 1.00 (w 0.1)
**J2 breakdown**: SEC-01 1.00 A01:2025 (w 0.2) · SEC-02 1.00 A02:2025 (w 0.15) · SEC-03 1.00 A03:2025 (w 0.2) · SEC-04 1.00 A05:2025 (w 0.25) · SEC-05 N/A A07:2025 (w 0.1) · SEC-06 1.00 A10:2025 (w 0.1)

**Verdict**: PASS · judge claude-opus-5-5 · rubric v1.1.0 (from `architecture.md` v1.1.0)
**Self-healing**: SH-LOOP-1 0/3 · SH-LOOP-3 0/3 · SH-LOOP-4 1/3 · SH-LOOP-6 1/3 · SH-LOOP-7 0/3 · SH-LOOP-8 0/3 · SH-LOOP-11 0/3 · SH-LOOP-12 0/3
**Bootstrapped**: tests/.evals/static/oxlint-complexity.json (D6), .gitleaks.toml (D7), behavioural runner (tests/.evals/behavior/)
