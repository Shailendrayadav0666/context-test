import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../App.css'

export default function ActivatePlan() {
  const { activatePlan } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleYes = async () => {
    setError('')
    setSubmitting(true)
    try {
      await activatePlan()
      navigate('/billing')
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  const handleSkip = () => {
    navigate('/billing')
  }

  return (
    <div className="login-page">
      <div className="login-right" style={{ width: '100%' }}>
        <div className="login-box">
          <h2>Activate your plan</h2>
          <p className="login-sub">
            Would you like to activate the Standard plan for $20/month?
          </p>
          {error && <p className="error-text">{error}</p>}
          <button
            type="button"
            className="btn"
            onClick={handleYes}
            disabled={submitting}
          >
            Yes
          </button>
          <button
            type="button"
            className="login-toggle"
            onClick={handleSkip}
            disabled={submitting}
          >
            No / Skip
          </button>
        </div>
      </div>
    </div>
  )
}
