import { Link } from 'react-router-dom'

export default function RegistrationSuccess({
  registrationId,
  email,
  name,
}) {

  return (
    <div className="registration-success">

      {/* =====================================================
          SUCCESS ICON
      ===================================================== */}

      <div className="registration-success-mark">
        ✓
      </div>


      {/* =====================================================
          TITLE
      ===================================================== */}

      <span className="registration-success-kicker">
        REGISTRATION COMPLETE
      </span>

      <h2>
        YOU'RE IN.
      </h2>

      <p>
        Welcome to the DATA PREMIER LEAGUE,
        {name ? ` ${name}` : ''}.
      </p>


      {/* =====================================================
          REGISTRATION ID
      ===================================================== */}

      <div className="registration-id-card">

        <span>
          YOUR DPL REGISTRATION ID
        </span>

        <strong>
          {registrationId}
        </strong>

        <small>
          Save this ID. You will need it for future
          DPL communication and participant status.
        </small>

      </div>


      {/* =====================================================
          EMAIL
      ===================================================== */}

      <div className="registration-success-info">

        <span>
          REGISTERED EMAIL
        </span>

        <strong>
          {email}
        </strong>

      </div>


      {/* =====================================================
          JOURNEY
      ===================================================== */}

      <div className="registration-success-journey">

        <div className="success-journey-item active">
          <span>01</span>
          <strong>REGISTERED</strong>
        </div>

        <div className="success-journey-line" />

        <div className="success-journey-item">
          <span>02</span>
          <strong>AUCTION</strong>
        </div>

        <div className="success-journey-line" />

        <div className="success-journey-item">
          <span>03</span>
          <strong>TEAM</strong>
        </div>

        <div className="success-journey-line" />

        <div className="success-journey-item">
          <span>04</span>
          <strong>LEAGUE</strong>
        </div>

      </div>


      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="registration-success-actions">

        <Link
          to="/"
          className="registration-primary-btn"
        >
          BACK TO DPL
          <span>→</span>
        </Link>

      </div>

    </div>
  )
}