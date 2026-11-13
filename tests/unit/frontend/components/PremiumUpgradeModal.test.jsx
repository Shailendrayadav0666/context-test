import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import PremiumUpgradeModal from '../../../../src/frontend/src/components/PremiumUpgradeModal'

afterEach(cleanup)

function renderModal(props = {}) {
  const onContinue = vi.fn()
  const onClose = vi.fn()
  render(
    <PremiumUpgradeModal open onContinue={onContinue} onClose={onClose} {...props} />,
  )
  return { onContinue, onClose }
}

describe('PremiumUpgradeModal', () => {
  it('renders nothing when closed', () => {
    render(<PremiumUpgradeModal open={false} onContinue={vi.fn()} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('is an accessible modal dialog named "Upgrade to Premium" (AC-2)', () => {
    renderModal()
    const dialog = screen.getByRole('dialog', { name: 'Upgrade to Premium' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })

  it('moves focus into the dialog on open (AC-2)', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog.contains(document.activeElement)).toBe(true)
  })

  it('shows the Premium price and every feature (AC-2)', () => {
    renderModal()
    expect(screen.getByText('$30/month')).toBeInTheDocument()
    const features = [
      'Ultra HD (4K)',
      'Watch on 4 devices at once',
      'Download on 6 devices',
      'Ad-free streaming',
      'Spatial audio',
    ]
    for (const feature of features) {
      expect(screen.getByText(feature)).toBeInTheDocument()
    }
    expect(screen.getAllByRole('listitem')).toHaveLength(features.length)
  })

  it('calls onContinue when Continue is chosen (AC-3)', () => {
    const { onContinue, onClose } = renderModal()
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(onContinue).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose when Cancel is chosen (AC-4)', () => {
    const { onContinue, onClose } = renderModal()
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onContinue).not.toHaveBeenCalled()
  })

  it('calls onClose when the Close control is chosen (AC-4)', () => {
    const { onClose } = renderModal()
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape is pressed (AC-4)', () => {
    const { onClose } = renderModal()
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('ignores other keys', () => {
    const { onClose, onContinue } = renderModal()
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'a' })
    expect(onClose).not.toHaveBeenCalled()
    expect(onContinue).not.toHaveBeenCalled()
  })
})
