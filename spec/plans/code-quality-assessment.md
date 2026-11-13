# Code Quality Assessment

> Existing-system context derived locally; Atlas was not consulted. Source: local-generation (Atlas unavailable — user approved). Analyzed at commit b774b82, 2026-11-13T08:28:49Z.

## Test Coverage
- **Overall**: None — no test files exist (`tests/` absent). Measured: `npx vitest run` in src/frontend found no files matching `**/*.test.jsx`.
- **Unit Tests**: none
- **Integration Tests**: none

## Code Quality Indicators
- **Linting**: Configured (oxlint). Measured: `npx oxlint` reports 0 errors and 3 warnings, all in AuthContext.jsx (logout read before initialization in useEffect; exhaustive-deps; only-export-components).
- **Code Style**: Consistent (2-space indent, single quotes, no semicolons)
- **Documentation**: Poor (frontend README is the Vite template)

## Technical Debt
- Token is the raw email (AuthContext.jsx / main.py) — POC only, not real auth.
- Billing payload duplicated in main.py (`billing_data` seed and `_standard_billing_payload`).
- Inline style objects mixed with CSS classes (Billing.jsx UsageIcon, ActivatePlan.jsx).
- Plan name "Standard" hard-coded in Billing.jsx heading, badge and section title.

## Patterns and Anti-patterns
- **Good Patterns**: context + hook for auth; protected routes; small presentational sub-components.
- **Anti-patterns**: fetch without error handling in Billing.jsx `loadBilling`; lint-disable comment on exhaustive-deps.
