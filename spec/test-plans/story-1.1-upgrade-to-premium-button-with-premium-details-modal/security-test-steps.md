# Security Test Steps — Story 1.1 Upgrade to Premium button with Premium details modal

**Purpose**: verify the frontend-only upgrade flow sends nothing to the server, changes no account data, and stays behind sign-in.
**Scope**: AC-5 (REQ-NF-01, REQ-NF-05) and the Security Baseline (SECURITY-08 access control, SECURITY-15 fail-safe defaults). Black-box.

## System Under Test
| Item | Value |
|------|-------|
| Branch | `epic/upgrade-to-premium-button` |
| This story's PR | the `[STORY]` PR for Story 1.1 — must be MERGED into the epic branch before execution |
| Confirm the story is in the build | `git log --oneline \| grep -i "1.1"` |
| How to build & run it | **Follow the project's own build docs** (README / CONTRIBUTING / Makefile). This plan does not restate them. |
| Local base URL / port | Frontend dev server URL printed at start-up (TO CONFIRM — typically `http://localhost:5173`) |
| Local services that must be up | backend API |
| Test data / accounts to seed | "Standard account" — create as described in `e2e-test-steps.md` shared setup |

> If the build or local run fails, that is a **blocker on the dev team** — report it and do not log functional failures against a system that never started.

---

### TC-SEC-01 — Upgrade flow makes no network request

| Field | Value |
|-------|-------|
| **Traces to** | AC-5 / REQ-NF-01 |
| **Type** | Security |
| **Priority** | P1 |
| **Preconditions** | Standard account signed in, on Plan and Billing page fully loaded; DevTools > Network open |
| **Test data** | Standard account |

**Steps**
1. In the Network tab, clear the request log and enable "Preserve log".
2. Click "Upgrade to Premium", then "Continue".
3. Click "Upgrade to Premium" again, then press Escape.
4. Click "Upgrade to Premium" again, then "Cancel".

**Expected result**
- The Network log stays empty — no XHR/fetch or other request is made by any of these actions.

**Pass/Fail criteria**: PASS if zero requests appear; FAIL on any request.
**Cleanup**: disable "Preserve log".

### TC-SEC-02 — Continue does not change the account (no data change)

| Field | Value |
|-------|-------|
| **Traces to** | AC-3, AC-5 / REQ-F-04, REQ-NF-01 |
| **Type** | Security |
| **Priority** | P1 |
| **Preconditions** | Standard account signed in |
| **Test data** | Standard account |

**Steps**
1. Open the dialog and click "Continue".
2. Log out, log back in with the same account, open Plan and Billing.

**Expected result**
- Plan is still "Standard" with the same price and renewal date; no Premium state exists anywhere.

**Pass/Fail criteria**: PASS if account data is unchanged; otherwise FAIL.
**Cleanup**: none.

### TC-SEC-03 — Billing page and button stay behind sign-in (SECURITY-08)

| Field | Value |
|-------|-------|
| **Traces to** | AC-1 / REQ-NF-05 |
| **Type** | Security |
| **Priority** | P2 |
| **Preconditions** | Signed out (click Logout) |
| **Test data** | none |

**Steps**
1. While signed out, type the Plan and Billing page path (`/billing`) directly into the address bar.

**Expected result**
- The app redirects to the Login page; no Plan and Billing content and no "Upgrade to Premium" button are shown.

**Pass/Fail criteria**: PASS if redirected without exposing the page; otherwise FAIL.
**Cleanup**: none.

### TC-SEC-04 — Fail-safe when billing data cannot load (SECURITY-15, negative)

| Field | Value |
|-------|-------|
| **Traces to** | AC-1 / REQ-F-02, REQ-NF-05 |
| **Type** | Security |
| **Priority** | P3 |
| **Preconditions** | Standard account signed in, on Plan and Billing page |
| **Test data** | Backend stopped |

**Steps**
1. Stop the backend API process.
2. Reload the Plan and Billing page.

**Expected result**
- No "Upgrade to Premium" button is shown (the page does not fail open into the active-plan view).
- No raw error or stack trace is displayed to the user.

**Pass/Fail criteria**: PASS if the button is absent and no raw error is shown; otherwise FAIL.
**Cleanup**: restart the backend (note: in-memory data is reset; recreate accounts as needed).
