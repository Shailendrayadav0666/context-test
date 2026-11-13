# E2E Test Steps — Story 1.1 Upgrade to Premium button with Premium details modal

**Purpose**: verify the complete user journeys of the Upgrade to Premium button on the Plan and Billing page.
**Scope**: AC-1 to AC-5 as seen by a signed-in subscriber in a browser. Black-box — derived from acceptance criteria only.

## System Under Test
| Item | Value |
|------|-------|
| Branch | `epic/upgrade-to-premium-button` |
| This story's PR | the `[STORY]` PR for Story 1.1 — must be MERGED into the epic branch before execution |
| Confirm the story is in the build | `git log --oneline \| grep -i "1.1"` |
| How to build & run it | **Follow the project's own build docs** (README / CONTRIBUTING / Makefile). This plan does not restate them. Start both the backend API and the frontend dev server. |
| Local base URL / port | Frontend dev server URL printed at start-up (TO CONFIRM — typically `http://localhost:5173`); API on `http://localhost:8000` behind the frontend `/api` proxy |
| Local services that must be up | backend API (in-memory data — restarting it resets all accounts) |
| Test data / accounts to seed | none pre-seeded; each case creates its own account via Sign Up (see test data) |

> If the build or local run fails, that is a **blocker on the dev team** — report it and do not log functional failures against a system that never started.

**Shared setup — "Standard account"**: on the Login page choose **Sign Up**, enter Full name `QA Tester`, a unique email such as `qa+<timestamp>@example.com`, password `Passw0rd!`, submit; on "Activate your plan" choose **Yes**. You land on Plan and Billing showing "Current plan: Standard".

**Shared setup — "No-plan account"**: as above, but on "Activate your plan" choose **No / Skip**. You land on Plan and Billing showing "No active plan".

---

### TC-E2E-01 — Button shown for an active Standard plan

| Field | Value |
|-------|-------|
| **Traces to** | AC-1 / REQ-F-01, REQ-F-02, REQ-NF-02 |
| **Type** | E2E |
| **Priority** | P1 |
| **Preconditions** | System Under Test running; "Standard account" created and signed in |
| **Test data** | Standard account from shared setup |

**Steps**
1. Navigate to the Plan and Billing page (top bar link **Billing**).
2. Wait until the page shows "Current plan: Standard" and the monthly price card.
3. Look next to the current plan / price area.

**Expected result**
- A button labelled exactly "Upgrade to Premium" is visible next to the current plan / price area.
- It has the same teal primary-button look as the existing primary buttons (e.g. "Sign In").

**Pass/Fail criteria**: PASS if the button is visible with that label and primary style in the active-plan view; otherwise FAIL.
**Cleanup**: none (restart backend to discard the account if desired).

### TC-E2E-02 — Button hidden when there is no active plan

| Field | Value |
|-------|-------|
| **Traces to** | AC-1 / REQ-F-02 |
| **Type** | E2E |
| **Priority** | P1 |
| **Preconditions** | System Under Test running; "No-plan account" created and signed in |
| **Test data** | No-plan account from shared setup |

**Steps**
1. Navigate to the Plan and Billing page.
2. Wait until "No active plan" is shown.

**Expected result**
- The "Activate Standard plan" button is shown.
- No "Upgrade to Premium" button appears anywhere on the page.

**Pass/Fail criteria**: PASS only if "Upgrade to Premium" is absent; FAIL if it appears.
**Cleanup**: none.

### TC-E2E-03 — Button hidden while billing data is loading

| Field | Value |
|-------|-------|
| **Traces to** | AC-1 / REQ-F-02 |
| **Type** | E2E |
| **Priority** | P2 |
| **Preconditions** | Standard account signed in; browser DevTools open |
| **Test data** | Standard account; DevTools Network throttling "Slow 3G" |

**Steps**
1. In DevTools > Network, set throttling to "Slow 3G".
2. Reload the Plan and Billing page.
3. While "Loading billing..." is displayed, look for the button.
4. Reset throttling to "No throttling".

**Expected result**
- While "Loading billing..." is shown, no "Upgrade to Premium" button is visible.
- After loading completes, the button appears (as in TC-E2E-01).

**Pass/Fail criteria**: PASS if the button is absent during loading and present after; otherwise FAIL.
**Cleanup**: set throttling back to "No throttling".

### TC-E2E-04 — Open the modal and see Premium details

| Field | Value |
|-------|-------|
| **Traces to** | AC-2 / REQ-F-03 |
| **Type** | E2E |
| **Priority** | P1 |
| **Preconditions** | Standard account signed in, on Plan and Billing page |
| **Test data** | Standard account |

**Steps**
1. Click "Upgrade to Premium".
2. Read the dialog content.

**Expected result**
- A dialog titled "Upgrade to Premium" opens over the page.
- It shows: "$30/month", "Ultra HD (4K)", "Watch on 4 devices at once", "Download on 6 devices", "Ad-free streaming", "Spatial audio".
- It offers "Continue", "Cancel" and a close control.

**Pass/Fail criteria**: PASS if all six details and all three controls are present; FAIL if any is missing or different.
**Cleanup**: click "Cancel".

### TC-E2E-05 — Continue shows the coming-soon message and keeps Standard

| Field | Value |
|-------|-------|
| **Traces to** | AC-3 / REQ-F-04 |
| **Type** | E2E |
| **Priority** | P1 |
| **Preconditions** | Standard account signed in, modal open (TC-E2E-04 steps 1) |
| **Test data** | Standard account |

**Steps**
1. Click "Continue".
2. Observe the Plan and Billing page.
3. Reload the page.

**Expected result**
- The dialog closes.
- The message "Premium upgrades are coming soon" is displayed on the page.
- "Current plan: Standard" is still shown, with the same price as before.
- After reload, the plan is still Standard (nothing was changed or saved).

**Pass/Fail criteria**: PASS if the message appears, the plan stays Standard and nothing persists after reload; otherwise FAIL.
**Cleanup**: none.

### TC-E2E-06 — Cancel dismisses with no change (negative path)

| Field | Value |
|-------|-------|
| **Traces to** | AC-4 / REQ-F-05 |
| **Type** | E2E |
| **Priority** | P1 |
| **Preconditions** | Standard account signed in, fresh page load, modal open |
| **Test data** | Standard account |

**Steps**
1. Click "Cancel".

**Expected result**
- The dialog closes.
- No "Premium upgrades are coming soon" message is shown.
- The page looks exactly as before opening the dialog.

**Pass/Fail criteria**: PASS if the dialog closes with no message and no change; otherwise FAIL.
**Cleanup**: none.

### TC-E2E-07 — Close control dismisses with no change

| Field | Value |
|-------|-------|
| **Traces to** | AC-4 / REQ-F-05 |
| **Type** | E2E |
| **Priority** | P2 |
| **Preconditions** | Standard account signed in, fresh page load, modal open |
| **Test data** | Standard account |

**Steps**
1. Click the dialog's close control (labelled "Close").

**Expected result**
- The dialog closes; no coming-soon message; page unchanged.

**Pass/Fail criteria**: PASS if behaviour matches; otherwise FAIL.
**Cleanup**: none.

### TC-E2E-08 — Repeated open/close cycles stay consistent (boundary)

| Field | Value |
|-------|-------|
| **Traces to** | AC-2, AC-3, AC-4 |
| **Type** | E2E |
| **Priority** | P3 |
| **Preconditions** | Standard account signed in, on Plan and Billing page |
| **Test data** | Standard account |

**Steps**
1. Open the dialog and click "Cancel". Repeat 3 times.
2. Open the dialog and click "Continue".
3. Open the dialog again.

**Expected result**
- Each open shows the same Premium details; each Cancel closes with no message.
- After step 2 the coming-soon message is shown once (not duplicated).
- Step 3 opens the dialog again normally.

**Pass/Fail criteria**: PASS if every cycle behaves identically and the message is never duplicated; otherwise FAIL.
**Cleanup**: close the dialog.
