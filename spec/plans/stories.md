EPIC TICKET: none (no Parent Epic recorded) — LOCAL epic: Upgrade to Premium Button (frontend only), see spec/plans/epic-brief.md

# User Stories — Upgrade to Premium Button

## Story 1.1: Upgrade to Premium button with Premium details modal

**Persona**: P1 — Standard Subscriber
**Tracker ID**: LOCAL
**Requires**: none
**Covers**: REQ-F-01, REQ-F-02, REQ-F-03, REQ-F-04, REQ-F-05, REQ-NF-01, REQ-NF-02, REQ-NF-03, REQ-NF-04, REQ-NF-05

**As a** Standard subscriber,
**I want** an "Upgrade to Premium" button on my Plan and Billing page that shows me what Premium offers,
**so that** I can learn about the higher tier without leaving the page.

### Acceptance Criteria

- **AC-1** (REQ-F-01, REQ-F-02, REQ-NF-02): Given I am signed in with an active Standard plan, when the Plan and Billing page loads, then an "Upgrade to Premium" button styled as the existing teal primary button is shown next to the current plan / price area. Given I have no active plan, or billing data is still loading, then the button is not shown.
- **AC-2** (REQ-F-03, REQ-NF-03, REQ-NF-05): Given the button is shown, when I activate it (click, Enter or Space), then a modal dialog opens with the heading "Upgrade to Premium" as its accessible name, `role="dialog"` and `aria-modal="true"`, focus moves into the dialog, and it shows static Premium details: $30/month; Ultra HD (4K); watch on 4 devices at once; download on 6 devices; all Standard perks (ad-free streaming, spatial audio).
- **AC-3** (REQ-F-04): Given the modal is open, when I choose "Continue", then the modal closes, the message "Premium upgrades are coming soon" is shown on the Billing page, and the current plan still shows Standard.
- **AC-4** (REQ-F-05, REQ-NF-03): Given the modal is open, when I choose "Cancel", the close control, or press Escape, then the modal closes, focus returns to the "Upgrade to Premium" button, no message is shown and the page is unchanged.
- **AC-5** (REQ-NF-01, REQ-NF-04): Opening, continuing and dismissing the modal makes no network request, no file under `src/backend/` is changed, and unit tests under `tests/unit/frontend/` cover AC-1 to AC-4.

### Notes
- Frontend only (`src/frontend/src/pages/Billing.jsx`, `App.css`, new component if useful). Premium values are static placeholders held in the frontend.

---

## Requirements Coverage Matrix

| REQ-ID | Covering stories | Status |
|---|---|---|
| REQ-F-01 | 1.1 (AC-1) | Full |
| REQ-F-02 | 1.1 (AC-1) | Full |
| REQ-F-03 | 1.1 (AC-2) | Full |
| REQ-F-04 | 1.1 (AC-3) | Full |
| REQ-F-05 | 1.1 (AC-4) | Full |
| REQ-NF-01 | 1.1 (AC-5) | Full |
| REQ-NF-02 | 1.1 (AC-1) | Full |
| REQ-NF-03 | 1.1 (AC-2, AC-4) | Full |
| REQ-NF-04 | 1.1 (AC-5) | Full |
| REQ-NF-05 | 1.1 (AC-2) | Full |

Requirements coverage: 10/10 REQ-IDs fully covered by story ACs.
