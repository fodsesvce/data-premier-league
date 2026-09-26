import { aboutPillars } from '../data/eventData'
import {
  TargetIcon,
  TeamIcon,
  TrophyIcon,
  ShieldIcon,
} from './Icons'

const pillarIcons = {
  target: TargetIcon,
  users: TeamIcon,
  trophy: TrophyIcon,
  shield: ShieldIcon,
}

export default function About() {
  return (
    <section
      id="about"
      className="about-section section-grid"
    >
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div
        className="section-header-block"
        data-reveal
      >
        <div className="section-badge-row">
          <span className="badge-line" />

          <span className="section-badge-text">
            01 // ABOUT DPL
          </span>

          <span className="badge-line" />
        </div>

        <h2 className="section-heading-display">
          ENTER AS AN
          <br />

          <span className="accent-gradient-blue">
            INDIVIDUAL. PLAY AS A TEAM.
          </span>
        </h2>

        <div className="heading-accent-line-blue" />

        <p className="section-lead-copy">
          DPL is an online technical league built around a
          participant-first journey. You register individually,
          and every registered participant enters the DPL auction.
          Team organizers then pick participants to build
          five-member squads. Once your team is formed, you
          compete together through the league and fight for a
          place in the top four and the knockout stage.
        </p>
      </div>

      {/* =====================================================
          ABOUT CONTENT
      ===================================================== */}

      <div className="about-grid-layout">

        {/* ===================================================
            LEFT COLUMN — PARTICIPANT JOURNEY
        =================================================== */}

        <div
          className="about-editorial-col"
          data-reveal
          data-delay="1"
        >
          <div className="editorial-cards-list">

            {/* =================================================
                STEP 01 — REGISTRATION
            ================================================= */}

            <article className="editorial-text-card">
              <div className="card-kicker-row">
                <span className="card-num">
                  01
                </span>

                <span className="card-kicker-tag">
                  ENTER INDIVIDUALLY
                </span>
              </div>

              <h3 className="card-headline">
                START YOUR DPL JOURNEY.
              </h3>

              <p className="card-lead-text">
                You don't need to bring a team.
              </p>

              <p className="card-body-text">
                Register individually and take your place in
                the DPL participant pool. Everyone who registers
                moves into the auction process.
              </p>
            </article>

            {/* =================================================
                STEP 02 — AUCTION
            ================================================= */}

            <article className="editorial-text-card">
              <div className="card-kicker-row">
                <span className="card-num">
                  02
                </span>

                <span className="card-kicker-tag">
                  ENTER THE AUCTION
                </span>
              </div>

              <h3 className="card-headline">
                YOUR AUCTION MOMENT.
              </h3>

              <p className="card-lead-text">
                Every registered participant gets into the game.
              </p>

              <p className="card-body-text">
                There is no resume or skills-based shortlisting
                stage. Once registered, you enter the DPL auction,
                where team organizers compete to build their
                squads from the participant pool.
              </p>
            </article>

            {/* =================================================
                STEP 03 — TEAM FORMATION
            ================================================= */}

            <article className="editorial-text-card">
              <div className="card-kicker-row">
                <span className="card-num">
                  03
                </span>

                <span className="card-kicker-tag">
                  GET PICKED
                </span>
              </div>

              <h3 className="card-headline">
                FIND YOUR SQUAD.
              </h3>

              <p className="card-lead-text">
                Five participants become one team.
              </p>

              <p className="card-body-text">
                When a team organizer picks you in the auction,
                you become part of a five-member squad. Your new
                teammates may be people you have never worked
                with before, making collaboration a key part of
                the DPL experience.
              </p>
            </article>

            {/* =================================================
                STEP 04 — COMPETITION
            ================================================= */}

            <article className="editorial-text-card">
              <div className="card-kicker-row">
                <span className="card-num">
                  04
                </span>

                <span className="card-kicker-tag">
                  COMPETE TOGETHER
                </span>
              </div>

              <h3 className="card-headline">
                TURN YOUR SQUAD INTO A CONTENDER.
              </h3>

              <p className="card-lead-text">
                The real competition begins after team formation.
              </p>

              <p className="card-body-text">
                Work with your new teammates through the online
                DPL league. Solve technical challenges, combine
                your strengths, compete against other squads,
                and push your team toward the top four and the
                knockout stage.
              </p>
            </article>

          </div>
        </div>

        {/* ===================================================
            RIGHT COLUMN — PARTICIPANT EXPERIENCE
        =================================================== */}

        <div
          className="about-highlights-col"
          data-reveal
          data-delay="2"
        >
          <div className="highlights-header">
            <h3 className="highlights-title">
              THE PARTICIPANT EXPERIENCE
            </h3>

            <span className="highlights-sub">
              WHAT DEFINES YOUR DPL JOURNEY
            </span>
          </div>

          <div className="highlights-cards-grid">
            {aboutPillars.map((pillar) => {
              const IconComponent =
                pillarIcons[pillar.icon] || TargetIcon

              return (
                <article
                  key={pillar.title}
                  className="highlight-feature-card"
                >
                  <div className="hl-icon-wrap">
                    <IconComponent size={20} />
                  </div>

                  <div className="hl-content">
                    <span className="hl-tag">
                      {pillar.tag}
                    </span>

                    <h4 className="hl-name">
                      {pillar.title}
                    </h4>

                    <p className="hl-desc">
                      {pillar.desc}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          {/* =================================================
              PARTICIPANT STATEMENT
          ================================================= */}

          <div className="about-participant-statement">
            <span className="statement-label">
              THE DPL EXPERIENCE
            </span>

            <p>
              YOU DON'T BRING
              <br />
              A TEAM.
              <br />

              <span className="text-accent-blue">
                YOU BECOME PART OF ONE.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}