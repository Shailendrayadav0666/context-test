import { useEffect, useRef } from 'react'

// Static Premium tier details (REQ-F-03). Rendered as plain text only — no
// network call, no auth context, no routing (ARCH-02, ARCH-04, REQ-NF-05).
const PREMIUM_DETAILS = {
  name: 'Premium',
  price: '$30/month',
  features: [
    'Ultra HD (4K)',
    'Watch on 4 devices at once',
    'Download on 6 devices',
    'Ad-free streaming',
    'Spatial audio',
  ],
}

const TITLE_ID = 'premium-upgrade-title'

/**
 * Accessible dialog describing the Premium tier.
 * Props:
 *  - open: whether the dialog is rendered
 *  - onContinue: called when the user chooses Continue
 *  - onClose: called on Cancel, the Close control or the Escape key
 */
export default function PremiumUpgradeModal({ open, onContinue, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus()
    }
  }, [open])

  if (!open) {
    return null
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
    }
  }

  return (
    <div className="modal-overlay">
      <div
        ref={dialogRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <div className="modal-header">
          <h3 id={TITLE_ID} className="modal-title">
            Upgrade to Premium
          </h3>
          <button
            type="button"
            className="modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <p className="modal-price">
          {PREMIUM_DETAILS.name} <span className="modal-price-value">{PREMIUM_DETAILS.price}</span>
        </p>
        <ul className="modal-feature-list">
          {PREMIUM_DETAILS.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn" onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
