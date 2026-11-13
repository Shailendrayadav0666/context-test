# StreamPlex — Frontend

The StreamPlex web app: a React 19 + Vite single-page app where a subscriber signs in, activates
the Standard plan and manages it on the **Plan & Billing** page. It talks to the FastAPI backend in
`src/backend/` through `/api/*` (proxied to `http://localhost:8000` by the Vite dev server).

## Pages

| Route | Page | What it does |
|---|---|---|
| `/login`, `/` | `src/pages/Login.jsx` | Sign in or create an account |
| `/activate-plan` | `src/pages/ActivatePlan.jsx` | Offers the Standard plan to a new user |
| `/billing` | `src/pages/Billing.jsx` | Current plan, price, renewal date and included usage |

Authentication state lives in `src/context/AuthContext.jsx`; `/billing` and `/activate-plan` are
protected routes.

### Upgrade to Premium

When a user has an active plan, the Plan & Billing page shows an **Upgrade to Premium** button in
the plan card, next to the plan and price. It opens `src/components/PremiumUpgradeModal.jsx`, an
accessible dialog (`role="dialog"`, `aria-modal`, focus moved inside, Escape closes) listing the
Premium tier:

- $30/month
- Ultra HD (4K)
- Watch on 4 devices at once
- Download on 6 devices
- Ad-free streaming
- Spatial audio

- **Continue** closes the dialog and shows "Premium upgrades are coming soon". The plan stays Standard.
- **Cancel**, the **Close** (×) control and **Escape** close the dialog without changes and return
  focus to the button.

The Premium details are static in the frontend. Opening or using the dialog makes no network
request, and the backend API is unchanged. The button is not shown while billing data is loading
or when the user has no active plan.

## Running locally

Prerequisites: Node.js 22.12+ and Python 3.11+.

```bash
# backend (from src/backend)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# frontend (from src/frontend)
npm ci
npm run dev          # http://localhost:5173
```

Demo account: `tpg@example.com` / `password`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Vite dev server with `/api` proxied to port 8000 |
| `npm run build` | Production build to `dist/` (served by the backend when present) |
| `npm run lint` | oxlint with the repo's `.oxlintrc.json` |
| `npx vitest run --coverage` | Unit tests (`tests/unit/frontend/`) with V8 coverage |
| `npx vitest run --config vitest.behavior.config.js` | Gherkin behaviour scenarios (`spec/behavior/*.feature`, steps in `tests/behavior/steps/`) |

Tests live at the repository root, not in this folder:

- `tests/unit/frontend/`: Vitest + Testing Library unit tests, mirroring `src/`
- `tests/behavior/`: step definitions for the `.feature` contracts, run in Podman by
  `tests/.evals/behavior/run.sh <b1|b2|b3>`
- `tests/e2e/`: Playwright browser tests (`npx playwright test` from the repo root)
