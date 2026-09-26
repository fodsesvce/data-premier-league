import { ArrowIcon } from './Icons'
import HeroCollage from './HeroCollage'

/**
 * Hero Component — DPL Main Event
 *
 * DPL (Data Premier League) is the main technical competition.
 *
 * Participant journey:
 * Individual Registration
 *        ↓
 * DPL Auction
 *        ↓
 * Get Picked by a Team
 *        ↓
 * Five-Member Team Formation
 *        ↓
 * Main Online Technical League
 *        ↓
 * Top 4
 *        ↓
 * Knockouts
 *        ↓
 * Winner & Runner-up
 *
 * Every registered participant enters the auction.
 * There is no resume/skills-based shortlisting stage.
 *
 * The auction is a team-formation stage within DPL,
 * not the event itself.
 */

export default function Hero() {
  /* =========================================================
     SCROLL TO ABOUT
  ========================================================= */

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  /* =========================================================
     GO TO REGISTRATION
     
     Registration is now handled inside the DPL website
     instead of redirecting participants to Google Forms.
  ========================================================= */

  const goToRegistration = () => {
    window.location.href = '/register'
  }

  return (
    <section
      id="home"
      className="hero-section section-grid"
    >
      {/* =====================================================
          SCROLLING IMAGE COLLAGE BACKGROUND
      ===================================================== */}

      <HeroCollage />

      <div className="hero-container hero-container-settled">

        {/* ===================================================
            TOP KICKER / BADGE ROW
        =================================================== */}

        <div className="hero-eyebrow-row">
          <span className="kicker-badge">
            OFFICIAL EVENT PORTAL
          </span>

          <span className="kicker-edition">
            DPL // DATA PREMIER LEAGUE
          </span>
        </div>

        {/* ===================================================
            MAIN DPL IDENTITY
        =================================================== */}

        <h1 className="hero-title-massive">
          <span className="hero-title-line">
            DATA
          </span>

          <span className="hero-title-line">
            PREMIER LEAGUE.
          </span>
        </h1>

        {/* ===================================================
            PARTICIPANT-CENTRIC EVENT MESSAGE
        =================================================== */}

        <p className="hero-description">
          Register individually. Enter the auction. Get picked by a
          team. Then compete with your new five-member squad through
          an online technical league and fight your way to the top.
        </p>

        {/* ===================================================
            ACTION BUTTONS
        =================================================== */}

        <div className="hero-cta-cluster">

          {/* =================================================
              REGISTER FOR DPL → INTERNAL REGISTRATION PAGE
          ================================================= */}

          <button
            type="button"
            className="btn-primary"
            onClick={goToRegistration}
          >
            <span>REGISTER FOR DPL</span>

            <ArrowIcon size={15} />
          </button>

          {/* =================================================
              EXPLORE DPL → ABOUT SECTION
          ================================================= */}

          <button
            type="button"
            className="btn-secondary"
            onClick={scrollToAbout}
          >
            <span>EXPLORE DPL</span>

            <ArrowIcon
              direction="down"
              size={13}
            />
          </button>

        </div>
      </div>
    </section>
  )
}