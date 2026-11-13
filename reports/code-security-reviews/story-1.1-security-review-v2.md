# Code Security Review Report (v2 — re-review after SH-LOOP-6 attempt 1)

**Date**: 2026-11-13
**Reviewer**: AI Security Audit (AIRE Security Baseline)
**Rules Source**: `aire-workflow/extensions/security/baseline/security-baseline.md`
**Project**: context-test (StreamPlex)
**Tech Stack**: React 19 + Vite (src/frontend), FastAPI (src/backend, untouched)
**Scan Scope**: This work unit's diff (story-1.1) and the attack surface it reaches — not the full codebase

---

## Executive Summary

- **Total Findings**: 1 (pre-existing only)
- **Critical/Blocker**: 0
- **High**: 0
- **Medium**: 0
- **Low**: 0
- **Pre-existing (not this change)**: 1 (Medium)
- **Security Rules Checked**: 16/16
- **Rules Compliant**: 6/16
- **Rules Non-Compliant**: 1/16 (pre-existing Medium only)
- **Rules N/A**: 9/16
- **Overall Risk Rating**: Low

Changed surface: `src/frontend/src/components/PremiumUpgradeModal.jsx` (new), `src/frontend/src/pages/Billing.jsx`, `src/frontend/src/App.css`, `src/frontend/package.json`, `src/frontend/vitest.config.js`, root `package.json` / `playwright.config.ts` / `.gitignore` / `.gitleaks.toml` / `.mcp.json`, and test files under `tests/`. The reachable surface is the protected `/billing` route and its existing `GET /api/billing` call. No endpoint, auth or data store is changed.

---

## Findings Summary Table

| # | Severity | Security Rule | Title | File(s) | Line(s) |
|---|----------|--------------|-------|---------|---------|
| 1 | Resolved (v2) | SECURITY-10 | New devDependencies not pinned by a committed lock file | `src/frontend/.gitignore` | — |
| 2 | Medium (pre-existing) | SECURITY-15 | Billing fetch has no rejection handler | `src/frontend/src/pages/Billing.jsx` | 105-109 |

---

## Critical / Blocker Findings

None.

## High Findings

None.

## Medium Findings

### [SEC-001] New devDependencies not pinned by a committed lock file — RESOLVED in review v2
- **Severity**: Medium (resolved)
- **Resolution**: `package-lock.json` removed from `src/frontend/.gitignore`; the lock file is committed with the story (npm ci --dry-run exit 0, npm audit 0, gitleaks clean) — SH-LOOP-6 attempt 1
- **Security Rule**: SECURITY-10 — Software Supply Chain Security
- **Verification Criteria Violated**: "A lock file exists and is committed to version control"
- **File(s)**: `src/frontend/package.json` (Lines 18-22, plus the `overrides` block), `src/frontend/.gitignore` (Line 11)
- **Description**: This change adds `@amiceli/vitest-cucumber`, `@playwright/test` and `@testing-library/user-event` with caret ranges, plus a `minimatch` override. The frontend ignores `package-lock.json` (a pre-existing project setting), so the resolved versions are not recorded in version control.
- **Evidence**: `.gitignore:11  package-lock.json`
- **Impact**: A fresh install (CI, another developer) may resolve different, unreviewed transitive versions of test tooling. The impact is limited to test tooling; no runtime dependency changed.
- **Remediation**: Stop ignoring `package-lock.json` in `src/frontend/.gitignore` and commit the lock file.
- **References**: CWE-1357, CWE-829 · OWASP A03:2025 Software Supply Chain Failures

### [SEC-002] Billing fetch has no rejection handler (PRE-EXISTING — not this change)
- **Severity**: Medium
- **Security Rule**: SECURITY-15 — Exception Handling and Fail-Safe Defaults
- **Verification Criteria Violated**: "All external calls have explicit error handling"
- **File(s)**: `src/frontend/src/pages/Billing.jsx` (Lines 105-109, untouched by this diff)
- **Description**: `loadBilling` chains `fetch().then(r => r.json()).then(setData)` with no `.catch`. A failed request leaves an unhandled rejection and the page stuck on "Loading billing...". The page fails closed: no upgrade UI and no raw error are shown (TC-SEC-04 PASS).
- **Impact**: There is no user-facing recovery message and the rejection is unhandled. Nothing is exposed.
- **Remediation**: Add a `.catch` that sets a generic error state. Recommend `/raise-defect`, because this line predates the story.
- **References**: CWE-755 · OWASP A10:2025

## Low Findings

None.

## Security Baseline Compliance Matrix

| Security Rule | Rule Name | Status | Findings |
|---|---|---|---|
| SECURITY-01 | Encryption at Rest and in Transit | N/A | 0 — no storage or transport change |
| SECURITY-02 | Access Logging on Network Intermediaries | N/A | 0 — no intermediary |
| SECURITY-03 | Application-Level Logging | N/A | 0 — no logging change; no secrets or PII logged |
| SECURITY-04 | HTTP Security Headers | N/A | 0 — no server or header config changed |
| SECURITY-05 | Input Validation | N/A | 0 — no new input or API parameter |
| SECURITY-06 | Least-Privilege Access Policies | N/A | 0 — no IAM |
| SECURITY-07 | Restrictive Network Configuration | N/A | 0 — no network config |
| SECURITY-08 | Application-Level Access Control | Compliant | 0 — /billing stays behind ProtectedRoute (App.jsx:56-62); TC-SEC-03 PASS |
| SECURITY-09 | Security Hardening | Compliant | 0 — no debug flags or defaults changed |
| SECURITY-10 | Software Supply Chain Security | Compliant | 0 — SEC-001 resolved: src/frontend/package-lock.json now committed; D4 npm audit 0 |
| SECURITY-11 | Secure Design Principles | Compliant | 0 — static content, no new trust boundary |
| SECURITY-12 | Authentication and Credential Management | N/A | 0 — no auth change; test fixtures use throwaway accounts only |
| SECURITY-13 | Software and Data Integrity | Compliant | 0 — no deserialisation or untrusted code paths; Continue persists nothing |
| SECURITY-14 | Alerting and Monitoring | N/A | 0 — no monitoring scope |
| SECURITY-15 | Exception Handling and Fail-Safe Defaults | Non-Compliant (pre-existing) | 1 Medium pre-existing (SEC-002); changed paths fail closed |
| SECURITY-16 | Cryptographic Standards | Compliant | 0 — no crypto in the diff; D7 gitleaks 0 findings |

## OWASP Reference Mapping

SEC-001 → A03:2025 Software Supply Chain Failures. SEC-002 → A10:2025 Mishandling of Exceptional Conditions.

## Recommendations Priority

### Immediate (Blocks Deployment)
None.
### Short-Term (Current Sprint)
None (SEC-001 resolved).
### Medium-Term (Current Release)
1. SEC-002 (pre-existing): add error handling to `loadBilling` through `/raise-defect`.
### Long-Term (Backlog)
None.

## Appendix

### Methodology
- Manual review of the story-1.1 diff against SECURITY-01 to SECURITY-16
- Static tool results reused, not re-run: semgrep D3 0, npm audit D4 0, gitleaks D7 0 (reports/eval-evidence/story-1.1/static/)

### Excluded from Scope
- Unchanged repository code, including `src/backend/`. The full audit is the standalone `code-security-review` skill.
