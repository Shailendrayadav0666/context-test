# Accessibility Test Steps — Story 1.1 Upgrade to Premium button with Premium details modal

**Purpose**: verify the button and Premium dialog are usable by keyboard and assistive technology.
**Scope**: AC-2 and AC-4 (REQ-NF-03). Black-box — derived from acceptance criteria only.

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

### TC-A11Y-01 — Open the dialog with the keyboard (WCAG 2.1.1 Keyboard)

| Field | Value |
|-------|-------|
| **Traces to** | AC-2 / REQ-NF-03 |
| **Type** | Accessibility |
| **Priority** | P1 |
| **Preconditions** | Standard account signed in, on Plan and Billing page; mouse not used |
| **Test data** | Standard account |

**Steps**
1. Press Tab repeatedly until the "Upgrade to Premium" button has a visible focus outline.
2. Press Enter.
3. Close the dialog with Escape, focus the button again and press Space.

**Expected result**
- The button is reachable by Tab and shows a visible focus indicator.
- Enter opens the dialog; Space also opens the dialog.

**Pass/Fail criteria**: PASS if both keys open the dialog and focus is visible; otherwise FAIL.
**Cleanup**: press Escape.

### TC-A11Y-02 — Focus moves into the dialog on open (WCAG 2.4.3 Focus Order)

| Field | Value |
|-------|-------|
| **Traces to** | AC-2 / REQ-NF-03 |
| **Type** | Accessibility |
| **Priority** | P1 |
| **Preconditions** | As TC-A11Y-01 |
| **Test data** | Standard account |

**Steps**
1. Open the dialog with Enter.
2. Without clicking, note which element has focus; press Tab a few times.

**Expected result**
- Immediately after opening, focus is on an element inside the dialog (the dialog itself or one of its controls).
- Tabbing moves through the dialog controls (Close, Cancel, Continue).

**Pass/Fail criteria**: PASS if focus starts inside the dialog; FAIL if it stays on the page behind.
**Cleanup**: press Escape.

### TC-A11Y-03 — Screen reader announces a named modal dialog (WCAG 4.1.2 Name, Role, Value)

| Field | Value |
|-------|-------|
| **Traces to** | AC-2 / REQ-NF-03 |
| **Type** | Accessibility |
| **Priority** | P1 |
| **Preconditions** | Standard account signed in; a screen reader running (NVDA on Windows or VoiceOver on macOS) |
| **Test data** | Standard account |

**Steps**
1. Focus "Upgrade to Premium" and listen to the announcement.
2. Activate it and listen to the announcement.
3. Alternatively, in browser DevTools > Accessibility pane, inspect the dialog element.

**Expected result**
- The button is announced as a button named "Upgrade to Premium".
- On open, a dialog named "Upgrade to Premium" is announced; DevTools shows role "dialog" and that it is modal.
- The close control is announced as "Close".

**Pass/Fail criteria**: PASS if role and names are announced as above; otherwise FAIL.
**Cleanup**: close the dialog; stop the screen reader.

### TC-A11Y-04 — Escape closes and focus returns to the button (WCAG 2.1.2 No Keyboard Trap, 2.4.3)

| Field | Value |
|-------|-------|
| **Traces to** | AC-4 / REQ-NF-03, REQ-F-05 |
| **Type** | Accessibility |
| **Priority** | P1 |
| **Preconditions** | Dialog opened by keyboard |
| **Test data** | Standard account |

**Steps**
1. Press Escape.
2. Note where focus is. Press Enter.

**Expected result**
- The dialog closes; no coming-soon message is shown.
- Focus is back on "Upgrade to Premium" (Enter re-opens the dialog).

**Pass/Fail criteria**: PASS if Escape closes and focus returns to the button; otherwise FAIL.
**Cleanup**: press Escape.

### TC-A11Y-05 — Cancel and Close return focus to the button (negative path)

| Field | Value |
|-------|-------|
| **Traces to** | AC-4 / REQ-NF-03 |
| **Type** | Accessibility |
| **Priority** | P2 |
| **Preconditions** | Dialog opened by keyboard |
| **Test data** | Standard account |

**Steps**
1. Tab to "Cancel" and press Enter; note focus.
2. Re-open with Enter, Tab to "Close" and press Enter; note focus.

**Expected result**
- After each, the dialog is closed and focus is on "Upgrade to Premium".

**Pass/Fail criteria**: PASS if focus returns both times; otherwise FAIL.
**Cleanup**: none.

### TC-A11Y-06 — Zoom to 200% and contrast (WCAG 1.4.4 Resize Text, 1.4.3 Contrast)

| Field | Value |
|-------|-------|
| **Traces to** | AC-1, AC-2 / REQ-NF-02, REQ-NF-03 |
| **Type** | Accessibility |
| **Priority** | P3 |
| **Preconditions** | Standard account signed in |
| **Test data** | Browser zoom 200% |

**Steps**
1. Set browser zoom to 200%.
2. Check the button label, then open the dialog and read all its text and controls.
3. Use DevTools contrast checker (or a contrast tool) on the button text and dialog text.

**Expected result**
- Button and all dialog content remain readable and operable at 200% with no clipped text or overlapping controls.
- Text contrast is at least 4.5:1.

**Pass/Fail criteria**: PASS if readable, operable and contrast at least 4.5:1; otherwise FAIL.
**Cleanup**: reset zoom to 100%.
