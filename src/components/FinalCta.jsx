import { event } from '../data/eventData'

export default function FinalCta() {
  return (
    <>
      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="site-footer">
        <div className="footer-inner section-grid">

          {/* =================================================
              FOOTER BRAND
          ================================================= */}

          <div className="footer-brand-col">
            <div className="footer-logo">
              <span className="footer-badge">
                DPL
              </span>

              <b className="footer-title">
                DATA PREMIER LEAGUE
              </b>
            </div>

            <p className="footer-tagline">
              ENTER SOLO. COMPETE AS A TEAM.
            </p>

            <span className="footer-edition-text">
              OFFICIAL DPL TECHNICAL COMPETITION PORTAL
            </span>
          </div>

          {/* =================================================
              FOOTER NAVIGATION
          ================================================= */}

          <div className="footer-nav-col">
            <span className="footer-heading">
              NAVIGATION
            </span>

            <a href="#home">
              HOME
            </a>

            <a href="#about">
              ABOUT DPL
            </a>

            <a href="#why-participate">
              WHY PARTICIPATE
            </a>

            <a href="#schedule">
              DPL JOURNEY
            </a>

            <a href="#teams">
              TEAMS
            </a>
          </div>

          {/* =================================================
              COMMUNITY
          ================================================= */}

          <div className="footer-nav-col">
            <span className="footer-heading">
              COMMUNITY
            </span>

            {/* Instagram */}

            <a
              href={event.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DPL Instagram"
            >
              INSTAGRAM ↗
            </a>

            {/* LinkedIn */}

            <a
              href={event.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="DPL LinkedIn"
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>

        {/* =====================================================
            FOOTER BOTTOM BAR
        ===================================================== */}

        <div className="footer-bottom-bar section-grid">
          <span>
            &copy; {new Date().getFullYear()} DPL. ALL
            RIGHTS RESERVED.
          </span>

          <span>
            OFFICIAL DATA PREMIER LEAGUE PORTAL
          </span>
        </div>
      </footer>
    </>
  )
}