import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

const activatePlan = vi.fn()

vi.mock('../../../../src/frontend/src/context/AuthContext', () => ({
  useAuth: () => ({ token: 'tpg@example.com', activatePlan }),
}))

import Billing from '../../../../src/frontend/src/pages/Billing'

const UPGRADE_COMING_SOON = 'Premium upgrades are coming soon'

const ACTIVE_PLAN = {
  has_plan: true,
  plan: 'Standard',
  price: '$20/month',
  renew_at: 'Dec 13, 2026',
  usages: [
    { id: 'video-quality', label: 'Video quality', type: 'feature', value: 'Full HD', help: 'Max resolution' },
    { id: 'screens', label: 'Screens', type: 'usage', used: 1, total: 2, help: 'Concurrent screens' },
    { id: 'downloads', label: 'Downloads', type: 'usage', used: 3, total: 2, help: 'Download devices' },
  ],
  included_usage: {
    title: 'Included usage',
    items: [{ id: 'hours', label: 'Streaming hours', used_percent: 40 }],
  },
}

function mockFetchOnce(body) {
  globalThis.fetch.mockResolvedValueOnce({ json: () => Promise.resolve(body) })
}

async function renderActive() {
  mockFetchOnce(ACTIVE_PLAN)
  render(<Billing />)
  return screen.findByRole('button', { name: 'Upgrade to Premium' })
}

beforeEach(() => {
  globalThis.fetch = vi.fn()
  activatePlan.mockReset()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Billing — Upgrade to Premium (Story 1.1)', () => {
  it('shows the loading state and no upgrade button while billing loads (AC-1)', () => {
    globalThis.fetch.mockReturnValueOnce(new Promise(() => {}))
    render(<Billing />)
    expect(screen.getByText('Loading billing...')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Upgrade to Premium' })).not.toBeInTheDocument()
  })

  it('hides the upgrade button when there is no active plan (AC-1)', async () => {
    mockFetchOnce({ has_plan: false })
    render(<Billing />)
    expect(await screen.findByRole('button', { name: 'Activate Standard plan' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Upgrade to Premium' })).not.toBeInTheDocument()
  })

  it('shows the upgrade button with the primary style for an active plan (AC-1)', async () => {
    const button = await renderActive()
    expect(button).toHaveClass('btn')
    expect(screen.getByText('$20/month')).toBeInTheDocument()
    expect(screen.getByText('Standard')).toBeInTheDocument()
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/billing?email=tpg%40example.com')
  })

  it('opens the Premium details modal (AC-2)', async () => {
    const button = await renderActive()
    fireEvent.click(button)
    const dialog = screen.getByRole('dialog', { name: 'Upgrade to Premium' })
    expect(dialog.contains(document.activeElement)).toBe(true)
    expect(screen.getByText('$30/month')).toBeInTheDocument()
  })

  it('Continue closes the modal, shows the coming-soon notice and keeps Standard (AC-3)', async () => {
    const button = await renderActive()
    fireEvent.click(button)
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(UPGRADE_COMING_SOON)
    expect(screen.getByText('Standard')).toBeInTheDocument()
  })

  it.each([
    ['Cancel', (s) => fireEvent.click(s.getByRole('button', { name: 'Cancel' }))],
    ['Close', (s) => fireEvent.click(s.getByRole('button', { name: 'Close' }))],
    ['Escape', (s) => fireEvent.keyDown(s.getByRole('dialog'), { key: 'Escape' })],
  ])('%s dismisses the modal without changes and returns focus (AC-4)', async (_name, dismiss) => {
    const button = await renderActive()
    fireEvent.click(button)
    dismiss(screen)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(button).toHaveFocus()
    expect(screen.queryByText(UPGRADE_COMING_SOON)).not.toBeInTheDocument()
  })

  it('reopening the modal clears a previous coming-soon notice', async () => {
    const button = await renderActive()
    fireEvent.click(button)
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.getByText(UPGRADE_COMING_SOON)).toBeInTheDocument()
    fireEvent.click(button)
    expect(screen.queryByText(UPGRADE_COMING_SOON)).not.toBeInTheDocument()
  })

  it('makes no network request during the upgrade flow (AC-5)', async () => {
    const button = await renderActive()
    const callsAfterLoad = globalThis.fetch.mock.calls.length
    fireEvent.click(button)
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    fireEvent.click(button)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(globalThis.fetch.mock.calls.length).toBe(callsAfterLoad)
  })
})

describe('Billing — existing plan activation (regression guard)', () => {
  it('activates the plan and reloads billing', async () => {
    mockFetchOnce({ has_plan: false })
    activatePlan.mockResolvedValueOnce({})
    mockFetchOnce(ACTIVE_PLAN)
    render(<Billing />)
    fireEvent.click(await screen.findByRole('button', { name: 'Activate Standard plan' }))
    expect(await screen.findByRole('button', { name: 'Upgrade to Premium' })).toBeInTheDocument()
    expect(activatePlan).toHaveBeenCalledTimes(1)
  })

  it('shows an activation error', async () => {
    mockFetchOnce({ has_plan: false })
    activatePlan.mockRejectedValueOnce(new Error('Plan activation failed'))
    render(<Billing />)
    fireEvent.click(await screen.findByRole('button', { name: 'Activate Standard plan' }))
    await waitFor(() => expect(screen.getByText('Plan activation failed')).toBeInTheDocument())
  })
})
