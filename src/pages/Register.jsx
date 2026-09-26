import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../components/Registration/Registration.css'
import RegistrationForm from '../components/Registration/RegistrationForm'

export default function Register() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }, [])

  return (
    <div className="registration-page">

      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="registration-page-grid"
        aria-hidden="true"
      />


      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="registration-header">

        <Link
          to="/"
          className="registration-brand"
          aria-label="Back to DPL homepage"
        >

          <span className="registration-logo">
            DPL
          </span>

          <span className="registration-brand-text">
            <strong>DATA PREMIER</strong>
            <small>LEAGUE</small>
          </span>

        </Link>


        <Link
          to="/"
          className="registration-back"
        >
          ← BACK TO DPL
        </Link>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="registration-main">

        <div className="registration-heading">

          <span className="registration-kicker">
            OFFICIAL EVENT PORTAL // DPL 2026
          </span>

          <h1>
            REGISTER
            <span> FOR DPL.</span>
          </h1>

          <p>
            Enter the Data Premier League as an individual.
            Complete your profile, upload your documents,
            and secure your place in the DPL participant pool.
          </p>

          <div className="registration-note">
            <span className="registration-note-dot" />
            EVERY REGISTERED PARTICIPANT ENTERS THE AUCTION
          </div>

        </div>


        {/* =====================================================
            FORM
        ===================================================== */}

        <RegistrationForm />

      </main>

    </div>
  )
}