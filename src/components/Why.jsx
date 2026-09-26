import {
  ArrowIcon,
  TargetIcon,
  TrophyIcon,
  TeamIcon,
  ShieldIcon,
} from './Icons'

const participantBenefits = [
  {
    num: '01',
    tag: 'REGISTER INDIVIDUALLY',
    subtitle: 'START YOUR JOURNEY',
    title: 'GET YOUR SHOT',
    description:
      'Enter DPL on your own. You do not need to arrive with a pre-built team. Every registered participant gets a place in the auction process.',
    icon: TargetIcon,
  },
  {
    num: '02',
    tag: 'ENTER THE AUCTION',
    subtitle: 'EVERYONE GETS IN',
    title: 'GET YOUR MOMENT',
    description:
      'Once registered, you enter the DPL auction. Team organizers pick participants from the auction to build their five-member squads.',
    icon: TrophyIcon,
  },
  {
    num: '03',
    tag: 'JOIN YOUR SQUAD',
    subtitle: 'BECOME FIVE',
    title: 'MEET YOUR TEAM',
    description:
      'Get picked by a team organizer and become part of a five-member squad. Your teammates may be people you have never worked with before.',
    icon: TeamIcon,
  },
  {
    num: '04',
    tag: 'COMPETE TO WIN',
    subtitle: 'CHASE THE TOP FOUR',
    title: 'PLAY AS ONE',
    description:
      'Collaborate with your new teammates through the online technical league, take on the challenges, push your team into the top four, and fight through the knockouts.',
    icon: ShieldIcon,
  },
]

export default function Why() {
  return (
    <section
      id="why-participate"
      className="why-section section-grid"
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
            02 // WHY PARTICIPATE
          </span>

          <span className="badge-line" />
        </div>

        <h2 className="section-heading-display">
          YOU ENTER
          <br />

          <span className="accent-gradient-blue">
            AS ONE. YOU COMPETE AS FIVE.
          </span>
        </h2>

        <div className="heading-accent-line-blue" />

        <p className="section-lead-copy">
          DPL gives every registered participant a route into
          the competition. Register individually, enter the
          auction, get picked by a team organizer, and become
          part of a five-member squad. From there, your new team
          takes on the online technical league together, with
          the top four advancing to the knockouts.
        </p>
      </div>

      {/* =====================================================
          PARTICIPANT JOURNEY
      ===================================================== */}

      <div
        className="why-pillars-grid"
        data-reveal
        data-delay="1"
      >
        {participantBenefits.map((benefit) => {
          const IconComp = benefit.icon

          return (
            <article
              key={benefit.num}
              className="why-pillar-card"
              tabIndex={0}
            >
              <div className="card-top-accent-blue" />

              <div className="pillar-card-inner">

                {/* =================================================
                    CARD HEADER
                ================================================= */}

                <div className="pillar-header-row">
                  <div className="pillar-icon-box">
                    <IconComp size={22} />
                  </div>

                  <span className="pillar-tag-badge">
                    {benefit.tag}
                  </span>
                </div>

                {/* =================================================
                    CARD CONTENT
                ================================================= */}

                <div className="pillar-main-content">
                  <span className="pillar-num-display">
                    {benefit.num}
                  </span>

                  <span className="pillar-sub-label">
                    {benefit.subtitle}
                  </span>

                  <h3 className="pillar-title-text">
                    {benefit.title}
                  </h3>

                  <p className="pillar-desc-text">
                    {benefit.description}
                  </p>
                </div>

                {/* =================================================
                    CARD FOOTER
                ================================================= */}

                <div className="pillar-card-footer">
                  <span className="footer-code-tag">
                    DPL // DATA PREMIER LEAGUE
                  </span>

                  <ArrowIcon
                    size={14}
                    className="pillar-arrow-icon"
                  />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}