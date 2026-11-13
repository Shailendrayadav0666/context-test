// Stubs ONLY the backend HTTP boundary (window.fetch) for behaviour scenarios.
// The application itself — router, auth context, pages, components — runs unmodified.
import { vi } from 'vitest'

export const ACTIVE_STANDARD_PLAN = {
  has_plan: true,
  plan: 'Standard',
  price: '$20/month',
  renew_at: 'Dec 13, 2026',
  usages: [
    { id: 'video-quality', label: 'Video quality', type: 'feature', value: 'Full HD (1080p)', help: 'Maximum streaming resolution' },
    { id: 'screens', label: 'Screens at once', type: 'usage', used: 1, total: 2, help: 'Devices streaming at the same time' },
    { id: 'downloads', label: 'Download devices', type: 'usage', used: 1, total: 2, help: 'Devices with downloads' },
  ],
  included_usage: {
    title: 'Included usage',
    items: [{ id: 'hours', label: 'Streaming hours this month', used_percent: 35 }],
  },
}

const json = (body, status = 200) =>
  Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) })

export function createBackendStub() {
  let billing = ACTIVE_STANDARD_PLAN
  let holdBilling = false
  // Own request log: vitest clears mock.calls between tests, and every Gherkin step is a test.
  const requests = []

  const fetch = vi.fn((url) => {
    const target = String(url)
    requests.push(target)
    if (target.startsWith('/api/users/me')) {
      return json({ name: 'TPG', email: 'tpg@example.com' })
    }
    if (target.startsWith('/api/billing')) {
      return holdBilling ? new Promise(() => {}) : json(billing)
    }
    return json({ detail: `unexpected request ${target}` }, 404)
  })

  return {
    fetch,
    setBilling(body) {
      billing = body
    },
    holdBilling() {
      holdBilling = true
    },
    calls(prefix = '') {
      return requests.filter((u) => u.startsWith(prefix)).length
    },
  }
}
