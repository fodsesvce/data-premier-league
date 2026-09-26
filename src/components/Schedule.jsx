import { schedulePhases } from '../data/eventData'
import { CheckIcon, ArrowIcon } from './Icons'

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="schedule-section section-grid"
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
            03 // DPL JOURNEY
          </span>

          <span className="badge-line" />
        </div>

        <h2 className="section-heading-display">
          YOUR JOURNEY
          <br />

          <span className="accent-gradient-blue">
            FROM REGISTRATION TO CHAMPION.
          </span>
        </h2>

        <div className="heading-accent-line-blue" />

        <p className="section-lead-copy">
          DPL starts with individual registration. Every
          registered participant enters the auction, where team
          organizers build five-member squads by picking
          participants. Once the teams are formed, the online
          league begins. The top four teams advance to the
          knockouts, leading to the final winner and runner-up.
        </p>
      </div>

      {/* =====================================================
          PARTICIPANT JOURNEY TIMELINE
      ===================================================== */}

      <div
        className="timeline-container"
        data-reveal
        data-delay="1"
      >
        <div
          className="timeline-track-line-blue"
          aria-hidden="true"
        />

        <div className="timeline-phases-grid">
          {schedulePhases.map((phase, index) => (
            <article
              key={phase.phase}
              className="timeline-node-card"
              tabIndex={0}
            >
              {/* =================================================
                  TIMELINE MARKER
              ================================================= */}

              <div className="node-marker-wrap">
                <div className="node-marker-circle-blue">
                  <CheckIcon size={14} />
                </div>

                <div
                  className="node-pulse-ring-blue"
                  aria-hidden="true"
                />
              </div>

              {/* =================================================
                  PHASE CONTENT
              ================================================= */}

              <div className="node-card-body">
                <div className="node-top-strip">
                  <span className="node-phase-badge-blue">
                    {phase.status}
                  </span>

                  <span className="node-timing-tag">
                    {phase.timing}
                  </span>
                </div>

                <h3 className="node-phase-title">
                  {phase.title}
                </h3>

                <p className="node-phase-desc">
                  {phase.desc}
                </p>

                <div className="node-card-footer">
                  <span className="footer-step-label">
                    DPL // STEP {String(index + 1).padStart(2, '0')}
                  </span>

                  <ArrowIcon
                    size={12}
                    className="node-arrow-blue"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* =====================================================
          PARTICIPANT JOURNEY SUMMARY
      ===================================================== */}

      
    </section>
  )
}