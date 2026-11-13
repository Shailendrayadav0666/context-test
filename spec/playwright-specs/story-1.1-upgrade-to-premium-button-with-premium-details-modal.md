# Story 1.1 - Upgrade to Premium button with Premium details modal

## Application Overview

Test plan for the Upgrade to Premium button and Premium details modal on /billing. Seed: tests/e2e/seed.spec.ts (Standard account via Sign Up, Activate plan Yes, lands on /billing). Each test creates its own fresh account (unique email qa+<timestamp>@example.com, password Passw0rd!, name QA Tester) because the backend is in-memory. "No-plan account" = same flow choosing No/Skip on Activate your plan. Observed: button "Upgrade to Premium" sits in the price card next to "Monthly plan $20/month / Active"; modal is role=dialog named "Upgrade to Premium", containing "Premium $30/month" and a feature list. Network grounding: story makes NO new request. Billing page calls GET /api/billing?email=<token> (always has query string, so mocks MUST use '**/api/billing*'); GET /api/users/me?email=<token> ('**/api/users/me*'); POST /api/auth/login, POST /api/auth/register, POST /api/billing/activate.

## Test Scenarios

### 1. E2E

**Seed:** `tests/e2e/seed.spec.ts`

#### 1.1. TC-E2E-01 Button shown for an active Standard plan

**File:** `tests/e2e/story-1.1/tc-e2e-01.spec.ts`

**Steps:**
  1. Create Standard account (seed); on /billing wait for 'Current plan: Standard' and the $20/month price card
    - expect: Button with exact name 'Upgrade to Premium' is visible in the price card next to the plan/price area
    - expect: Button has class 'btn' (same primary styling as other primary buttons)

#### 1.2. TC-E2E-02 Button hidden when there is no active plan

**File:** `tests/e2e/story-1.1/tc-e2e-02.spec.ts`

**Steps:**
  1. Create No-plan account (choose No/Skip on Activate your plan); open /billing
    - expect: 'No active plan' is shown
    - expect: 'Activate Standard plan' button is visible
    - expect: No 'Upgrade to Premium' button anywhere (count 0)

#### 1.3. TC-E2E-03 Button hidden while billing data is loading

**File:** `tests/e2e/story-1.1/tc-e2e-03.spec.ts`

**Steps:**
  1. Create Standard account; route '**/api/billing*' with a delay (e.g. 2s) before continuing; reload /billing
    - expect: While 'Loading billing...' is visible, 'Upgrade to Premium' count is 0
  2. Wait for loading to finish
    - expect: 'Current plan: Standard' shown and the 'Upgrade to Premium' button appears

#### 1.4. TC-E2E-04 Open the modal and see Premium details

**File:** `tests/e2e/story-1.1/tc-e2e-04.spec.ts`

**Steps:**
  1. Create Standard account; click 'Upgrade to Premium'
    - expect: Dialog titled 'Upgrade to Premium' is visible
    - expect: Dialog shows '$30/month', 'Ultra HD (4K)', 'Watch on 4 devices at once', 'Download on 6 devices', 'Ad-free streaming', 'Spatial audio'
    - expect: Buttons 'Continue', 'Cancel' and 'Close' control are present in the dialog

#### 1.5. TC-E2E-05 Continue shows coming-soon message and keeps Standard

**File:** `tests/e2e/story-1.1/tc-e2e-05.spec.ts`

**Steps:**
  1. Create Standard account; note price and renewal date; open modal; click 'Continue'
    - expect: Dialog closes
    - expect: 'Premium upgrades are coming soon' is shown on the page
    - expect: 'Current plan: Standard' still shown with same $20/month price
  2. Reload /billing
    - expect: Plan is still Standard

#### 1.6. TC-E2E-06 Cancel dismisses with no change

**File:** `tests/e2e/story-1.1/tc-e2e-06.spec.ts`

**Steps:**
  1. Create Standard account; open modal; click 'Cancel'
    - expect: Dialog closes
    - expect: No 'Premium upgrades are coming soon' message
    - expect: Page still shows Current plan: Standard and Upgrade to Premium button

#### 1.7. TC-E2E-07 Close control dismisses with no change

**File:** `tests/e2e/story-1.1/tc-e2e-07.spec.ts`

**Steps:**
  1. Create Standard account; open modal; click the 'Close' control
    - expect: Dialog closes
    - expect: No coming-soon message
    - expect: Page unchanged

#### 1.8. TC-E2E-08 Repeated open/close cycles stay consistent

**File:** `tests/e2e/story-1.1/tc-e2e-08.spec.ts`

**Steps:**
  1. Three times: open modal, verify same details, click Cancel
    - expect: Same details each time
    - expect: No coming-soon message after any cycle
  2. Open modal and click Continue
    - expect: Message 'Premium upgrades are coming soon' appears exactly once (count 1, not duplicated)
  3. Open modal again
    - expect: Dialog opens normally with the same details

### 2. Accessibility

**Seed:** `tests/e2e/seed.spec.ts`

#### 2.1. TC-A11Y-01 Open with keyboard

**File:** `tests/e2e/story-1.1/tc-a11y-01.spec.ts`

**Steps:**
  1. Press Tab repeatedly until 'Upgrade to Premium' is focused
    - expect: Button is focused with a visible focus indicator
  2. Press Enter, then Escape
    - expect: Dialog opens on Enter and closes on Escape
  3. Focus the button again and press Space
    - expect: Dialog opens

#### 2.2. TC-A11Y-02 Focus moves into dialog on open

**File:** `tests/e2e/story-1.1/tc-a11y-02.spec.ts`

**Steps:**
  1. Focus button and press Enter
    - expect: document.activeElement is the dialog or inside it immediately
  2. Press Tab repeatedly
    - expect: Focus moves through Close, Cancel, Continue and stays within the dialog

#### 2.3. TC-A11Y-03 Named modal dialog (role/name)

**File:** `tests/e2e/story-1.1/tc-a11y-03.spec.ts`

**Steps:**
  1. Query getByRole('button',{name:'Upgrade to Premium'}); open it
    - expect: Button has role button and name 'Upgrade to Premium'
    - expect: getByRole('dialog',{name:'Upgrade to Premium'}) is visible with aria-modal='true'
    - expect: Close control found by getByRole('button',{name:'Close'})

#### 2.4. TC-A11Y-04 Escape closes and focus returns

**File:** `tests/e2e/story-1.1/tc-a11y-04.spec.ts`

**Steps:**
  1. Open dialog via keyboard (Tab to button, Enter); press Escape
    - expect: Dialog closes
    - expect: No coming-soon message
    - expect: Focus is on 'Upgrade to Premium' button
    - expect: Enter re-opens the dialog

#### 2.5. TC-A11Y-05 Cancel and Close return focus

**File:** `tests/e2e/story-1.1/tc-a11y-05.spec.ts`

**Steps:**
  1. Open by keyboard; Tab to Cancel; press Enter
    - expect: Dialog closed, focus on 'Upgrade to Premium'
  2. Re-open with Enter; Tab to Close; press Enter
    - expect: Dialog closed, focus on 'Upgrade to Premium'

#### 2.6. TC-A11Y-06 Zoom 200% and contrast

**File:** `tests/e2e/story-1.1/tc-a11y-06.spec.ts`

**Steps:**
  1. Emulate 200% zoom (viewport halved e.g. 640x360 or CSS zoom: 2); open modal
    - expect: Button label and all dialog text/controls visible, operable, within viewport scroll, no clipping or overlap (bounding boxes of Cancel/Continue/Close do not intersect)
  2. Compute contrast from getComputedStyle color vs effective background for the button and dialog text
    - expect: Contrast ratio is at least 4.5:1 for each

### 3. Security

**Seed:** `tests/e2e/seed.spec.ts`

#### 3.1. TC-SEC-01 Upgrade flow makes no network request

**File:** `tests/e2e/story-1.1/tc-sec-01.spec.ts`

**Steps:**
  1. On fully loaded /billing start recording page requests; click Upgrade to Premium then Continue; open and press Escape; open and click Cancel
    - expect: Zero requests recorded during these actions

#### 3.2. TC-SEC-02 Continue does not change the account

**File:** `tests/e2e/story-1.1/tc-sec-02.spec.ts`

**Steps:**
  1. Record price and renewal date; open dialog, click Continue; click Logout; log in again with same email/password; open /billing
    - expect: 'Current plan: Standard', same $20/month price and same renewal date

#### 3.3. TC-SEC-03 Billing page stays behind sign-in

**File:** `tests/e2e/story-1.1/tc-sec-03.spec.ts`

**Steps:**
  1. In a fresh context (signed out) navigate directly to /billing
    - expect: Redirected to /login
    - expect: No billing content and no 'Upgrade to Premium' button

#### 3.4. TC-SEC-04 Fail-safe when billing data cannot load

**File:** `tests/e2e/story-1.1/tc-sec-04.spec.ts`

**Steps:**
  1. Create Standard account; route '**/api/billing*' to abort; reload /billing
    - expect: No 'Upgrade to Premium' button
    - expect: No raw error text, stack trace or exception details visible
