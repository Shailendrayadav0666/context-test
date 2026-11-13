// Gherkin step definitions for spec/behavior/story-1.1.feature (Story 1.1).
// Bound to the application's public surface: the real <App /> rendered at /billing,
// driven the way a user drives it (roles, names, keyboard), with only the backend
// HTTP boundary (fetch) stubbed. Runner: @amiceli/vitest-cucumber, explicit feature path.
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { loadFeature, describeFeature } from '@amiceli/vitest-cucumber'
import { expect, vi } from 'vitest'
import { render, screen, cleanup, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import App from '../../../src/frontend/src/App'
import { createBackendStub, ACTIVE_STANDARD_PLAN } from '../support/backend-stub'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const feature = await loadFeature(path.join(repoRoot, 'spec/behavior/story-1.1.feature'))

const UPGRADE = 'Upgrade to Premium'
const COMING_SOON = 'Premium upgrades are coming soon'

describeFeature(feature, ({ Background, Scenario, BeforeEachScenario, AfterEachScenario }) => {
  let backend
  let user
  let callsAfterLoad

  BeforeEachScenario(() => {
    backend = createBackendStub()
    vi.stubGlobal('fetch', backend.fetch)
    user = userEvent.setup()
    callsAfterLoad = 0
  })

  AfterEachScenario(() => {
    cleanup()
    vi.unstubAllGlobals()
    localStorage.clear()
    window.history.pushState({}, '', '/')
  })

  // ---- shared step bodies (one vocabulary across scenarios) ----
  const hasActivePlan = () => backend.setBilling(ACTIVE_STANDARD_PLAN)

  const openBillingPage = async () => {
    window.history.pushState({}, '', '/billing')
    render(<App />)
    await waitFor(() => expect(backend.calls('/api/billing')).toBeGreaterThan(0))
  }

  const pageFinishedLoading = async () => {
    await openBillingPage()
    await screen.findByRole('button', { name: UPGRADE })
    await waitFor(() => expect(backend.calls('/api/users/me')).toBe(1))
    callsAfterLoad = backend.calls()
  }

  const openModal = async () => {
    hasActivePlan()
    await pageFinishedLoading()
    await user.click(screen.getByRole('button', { name: UPGRADE }))
    expect(screen.getByRole('dialog', { name: UPGRADE })).toBeInTheDocument()
  }

  const modalIsOpen = () => {
    const dialog = screen.getByRole('dialog', { name: UPGRADE })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  }

  const modalIsClosed = () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  }

  const focusOnUpgradeButton = () => {
    expect(screen.getByRole('button', { name: UPGRADE })).toHaveFocus()
  }

  const noComingSoon = () => {
    expect(screen.queryByText(COMING_SOON)).not.toBeInTheDocument()
  }

  const noUpgradeButton = () => {
    expect(screen.queryByRole('button', { name: UPGRADE })).not.toBeInTheDocument()
  }

  const dialogShows = (text) => () => {
    const dialog = screen.getByRole('dialog', { name: UPGRADE })
    expect(within(dialog).getByText(text)).toBeInTheDocument()
  }

  Background(({ Given }) => {
    Given('a user "tpg@example.com" is signed in', () => {
      localStorage.setItem('token', 'tpg@example.com')
    })
  })

  Scenario('Button is shown for an active Standard plan', ({ Given, When, Then, And }) => {
    Given('"tpg@example.com" has an active "Standard" plan at "$20/month"', hasActivePlan)
    When('the user opens the Plan and Billing page', openBillingPage)
    Then('an "Upgrade to Premium" button is shown next to the current plan and price', async () => {
      const button = await screen.findByRole('button', { name: UPGRADE })
      const planCard = button.closest('.plan-card')
      expect(planCard).not.toBeNull()
      expect(within(planCard).getByText('$20/month')).toBeInTheDocument()
      expect(screen.getByText('Standard', { selector: '.standard-badge' })).toBeInTheDocument()
    })
    And('the button uses the primary button style', () => {
      const button = screen.getByRole('button', { name: UPGRADE })
      expect(button).toHaveClass('btn')
      expect(button).not.toHaveClass('btn-secondary')
    })
  })

  Scenario('Button is hidden when the user has no active plan', ({ Given, When, Then, And }) => {
    Given('"tpg@example.com" has no active plan', () => backend.setBilling({ has_plan: false }))
    When('the user opens the Plan and Billing page', openBillingPage)
    Then('the "Activate Standard plan" button is shown', async () => {
      expect(await screen.findByRole('button', { name: 'Activate Standard plan' })).toBeInTheDocument()
    })
    And('no "Upgrade to Premium" button is shown', noUpgradeButton)
  })

  Scenario('Button is hidden while billing data is loading', ({ Given, When, Then, And }) => {
    Given('the billing data has not finished loading', () => backend.holdBilling())
    When('the user opens the Plan and Billing page', openBillingPage)
    Then('the text "Loading billing..." is shown', () => {
      expect(screen.getByText('Loading billing...')).toBeInTheDocument()
    })
    And('no "Upgrade to Premium" button is shown', noUpgradeButton)
  })

  Scenario('Opening the Premium details modal', ({ Given, When, Then, And }) => {
    Given('"tpg@example.com" has an active "Standard" plan at "$20/month"', hasActivePlan)
    And('the user is on the Plan and Billing page', pageFinishedLoading)
    When('the user activates the "Upgrade to Premium" button', async () => {
      await user.click(screen.getByRole('button', { name: UPGRADE }))
    })
    Then('a modal dialog named "Upgrade to Premium" is open', modalIsOpen)
    And('focus is inside the dialog', () => {
      const dialog = screen.getByRole('dialog', { name: UPGRADE })
      expect(dialog.contains(document.activeElement)).toBe(true)
    })
    And('the dialog shows the price "$30/month"', dialogShows('$30/month'))
    And('the dialog shows "Ultra HD (4K)"', dialogShows('Ultra HD (4K)'))
    And('the dialog shows "Watch on 4 devices at once"', dialogShows('Watch on 4 devices at once'))
    And('the dialog shows "Download on 6 devices"', dialogShows('Download on 6 devices'))
    And('the dialog shows "Ad-free streaming"', dialogShows('Ad-free streaming'))
    And('the dialog shows "Spatial audio"', dialogShows('Spatial audio'))
  })

  Scenario('Opening the modal with the keyboard', ({ Given, When, Then, And }) => {
    Given('"tpg@example.com" has an active "Standard" plan at "$20/month"', hasActivePlan)
    And('the "Upgrade to Premium" button has keyboard focus', async () => {
      await pageFinishedLoading()
      screen.getByRole('button', { name: UPGRADE }).focus()
      focusOnUpgradeButton()
    })
    When('the user presses "Enter"', async () => {
      await user.keyboard('{Enter}')
    })
    Then('a modal dialog named "Upgrade to Premium" is open', modalIsOpen)
  })

  Scenario('Continue shows the coming-soon message and keeps Standard', ({ Given, When, Then, And }) => {
    Given('the "Upgrade to Premium" modal is open', openModal)
    When('the user chooses "Continue"', async () => {
      await user.click(screen.getByRole('button', { name: 'Continue' }))
    })
    Then('the modal is closed', modalIsClosed)
    And('the message "Premium upgrades are coming soon" is shown', () => {
      expect(screen.getByRole('status')).toHaveTextContent(COMING_SOON)
    })
    And('the current plan still shows "Standard"', () => {
      expect(screen.getByText('Standard', { selector: '.standard-badge' })).toBeInTheDocument()
    })
  })

  Scenario('Cancel dismisses the modal without changes', ({ Given, When, Then, And }) => {
    Given('the "Upgrade to Premium" modal is open', openModal)
    When('the user chooses "Cancel"', async () => {
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
    })
    Then('the modal is closed', modalIsClosed)
    And('focus is on the "Upgrade to Premium" button', focusOnUpgradeButton)
    And('the message "Premium upgrades are coming soon" is not shown', noComingSoon)
  })

  Scenario('Close control dismisses the modal without changes', ({ Given, When, Then, And }) => {
    Given('the "Upgrade to Premium" modal is open', openModal)
    When('the user chooses the close control labelled "Close"', async () => {
      await user.click(screen.getByRole('button', { name: 'Close' }))
    })
    Then('the modal is closed', modalIsClosed)
    And('focus is on the "Upgrade to Premium" button', focusOnUpgradeButton)
    And('the message "Premium upgrades are coming soon" is not shown', noComingSoon)
  })

  Scenario('Escape key dismisses the modal without changes', ({ Given, When, Then, And }) => {
    Given('the "Upgrade to Premium" modal is open', openModal)
    When('the user presses "Escape"', async () => {
      await user.keyboard('{Escape}')
    })
    Then('the modal is closed', modalIsClosed)
    And('focus is on the "Upgrade to Premium" button', focusOnUpgradeButton)
    And('the message "Premium upgrades are coming soon" is not shown', noComingSoon)
  })

  Scenario('The upgrade flow makes no network request', ({ Given, When, Then, And }) => {
    Given('"tpg@example.com" has an active "Standard" plan at "$20/month"', hasActivePlan)
    And('the Plan and Billing page has finished loading', pageFinishedLoading)
    When('the user opens the modal, chooses "Continue", reopens it and presses "Escape"', async () => {
      const button = screen.getByRole('button', { name: UPGRADE })
      await user.click(button)
      await user.click(screen.getByRole('button', { name: 'Continue' }))
      await user.click(button)
      await user.keyboard('{Escape}')
      modalIsClosed()
    })
    Then('no additional network request is made after the page finished loading', () => {
      expect(backend.calls()).toBe(callsAfterLoad)
    })
  })
})
