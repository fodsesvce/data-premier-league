import { useState, useEffect, useRef, useCallback } from "react"
import { teams } from "../data/teams"

/* ==========================================================================
   DPL 2026 — TEAMS REVEAL SECTION
   ========================================================================== */

/* --------------------------------------------------------------------------
   PLAYER PROFILE OVERLAY
   Opens on top of the Squad Modal. Closing it returns to the Squad Modal.
   -------------------------------------------------------------------------- */

function PlayerProfile({ player, teamName, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const el = panelRef.current
    if (el) el.focus()

    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation()   // do NOT bubble up to close Squad Modal too
        onClose()
      }
    }

    window.addEventListener("keydown", handleKey, true)  // capture phase
    return () => window.removeEventListener("keydown", handleKey, true)
  }, [onClose])

  const handleBackdropClick = useCallback(
    (e) => { if (e.target === e.currentTarget) onClose() },
    [onClose]
  )

  return (
    <div
      className="trpp-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Player profile: ${player.name}`}
    >
      <div
        className="trpp-panel"
        ref={panelRef}
        tabIndex={-1}
      >
        {/* -- close -- */}
        <button
          className="trpp-close"
          onClick={onClose}
          aria-label="Close player profile"
        >
          <span aria-hidden="true">✕</span>
        </button>

        {/* -- photo -- */}
        <div className="trpp-photo-wrap">
          <img
            src={player.image}
            alt={player.name}
            className="trpp-photo"
            onError={(e) => {
              e.currentTarget.style.opacity = "0.3"
              e.currentTarget.style.filter = "grayscale(1)"
            }}
          />
          <div className="trpp-photo-glow" aria-hidden="true" />
        </div>

        {/* -- info -- */}
        <div className="trpp-info">
          <span className="trpp-team-tag">{teamName}</span>

          <h2 className="trpp-player-name">{player.name.toUpperCase()}</h2>

          <div className="trpp-divider" aria-hidden="true" />

          <span className="trpp-official-tag">OFFICIAL DPL SQUAD</span>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------------
   MODAL — SQUAD DETAIL
   -------------------------------------------------------------------------- */

function SquadModal({ team, onClose }) {
  const modalRef = useRef(null)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  /* trap focus & Escape for the squad modal itself */
  useEffect(() => {
    const el = modalRef.current
    if (el) el.focus()

    const handleKey = (e) => {
      /* only fire when no player profile is open */
      if (!selectedPlayer && e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose, selectedPlayer])

  const handleBackdropClick = useCallback(
    (e) => { if (e.target === e.currentTarget) onClose() },
    [onClose]
  )

  const openPlayer = useCallback((member) => setSelectedPlayer(member), [])
  const closePlayer = useCallback(() => setSelectedPlayer(null), [])

  if (!team) return null

  return (
    <>
      <div
        className="tr-modal-backdrop"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label={`${team.name} squad`}
      >
        <div
          className="tr-modal-panel"
          ref={modalRef}
          tabIndex={-1}
        >
          {/* ---- header ---- */}
          <div className="tr-modal-header">
            <div className="tr-modal-title-block">
              <span className="tr-modal-edition">DPL 2026 // OFFICIAL SQUAD</span>
              <h2 className="tr-modal-team-name">{team.name}</h2>
              <div className="tr-modal-divider" />
              <span className="tr-modal-count">
                {team.members.length} PLAYERS CONFIRMED
              </span>
            </div>

            <button
              className="tr-modal-close"
              onClick={onClose}
              aria-label="Close squad panel"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          {/* ---- players grid ---- */}
          <div className="tr-modal-players-grid">
            {team.members.map((member, idx) => (
              <button
                key={member.name}
                className="tr-player-card tr-player-card--clickable"
                onClick={() => openPlayer(member)}
                aria-label={`View profile of ${member.name}`}
              >
                <div className="tr-player-photo-wrap">
                  <span className="tr-player-number">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <img
                    src={member.image}
                    alt={member.name}
                    className="tr-player-photo"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0.3"
                      e.currentTarget.style.filter = "grayscale(1)"
                    }}
                  />

                  <div className="tr-player-photo-overlay" aria-hidden="true" />
                </div>

                <div className="tr-player-info">
                  <span className="tr-player-team-tag">{team.name}</span>
                  <p className="tr-player-name">{member.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Player profile — rendered on top; squad modal stays mounted */}
      {selectedPlayer && (
        <PlayerProfile
          player={selectedPlayer}
          teamName={team.name}
          onClose={closePlayer}
        />
      )}
    </>
  )
}

/* --------------------------------------------------------------------------
   TEAM CARD
   -------------------------------------------------------------------------- */

function TeamCard({ team, index, onOpen }) {
  const cardRef = useRef(null)

  return (
    <article
      ref={cardRef}
      className="tr-team-card"
      data-reveal
      style={{ "--tr-card-delay": `${index * 0.07}s` }}
      tabIndex={0}
      role="button"
      aria-label={`View ${team.name} squad`}
      onClick={() => onOpen(team)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen(team)
        }
      }}
    >
      {/* corner accent */}
      <div className="tr-card-corner-tl" aria-hidden="true" />

      {/* team badge */}
      <div className="tr-card-header">
        <div className="tr-card-id-row">
          <span className="tr-card-number">
            {String(team.id).padStart(2, "0")}
          </span>
          <span className="tr-card-slash" aria-hidden="true">//</span>
          <span className="tr-card-label">DPL 2026</span>
        </div>

        <h3 className="tr-card-team-name">{team.name}</h3>

        <div className="tr-card-meta-row">
          <span className="tr-card-player-count">
            {team.members.length} PLAYERS
          </span>

          {team.owner && (
            <span className="tr-card-owner-tag">OWNER: {team.owner}</span>
          )}
        </div>
      </div>

      {/* portrait strip */}
      <div className="tr-card-portraits">
        {team.members.map((member) => (
          <div key={member.name} className="tr-card-portrait-wrap">
            <img
              src={member.image}
              alt={member.name}
              className="tr-card-portrait-img"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.opacity = "0.3"
                e.currentTarget.style.filter = "grayscale(1)"
              }}
            />
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className="tr-card-cta">
        <span className="tr-card-cta-text">VIEW SQUAD</span>
        <span className="tr-card-cta-arrow" aria-hidden="true">→</span>
      </div>

      {/* light sweep */}
      <div className="tr-card-sweep" aria-hidden="true" />
    </article>
  )
}

/* --------------------------------------------------------------------------
   SECTION
   -------------------------------------------------------------------------- */

export default function TeamsReveal() {
  const [activeTeam, setActiveTeam] = useState(null)

  const openModal = useCallback((team) => setActiveTeam(team), [])
  const closeModal = useCallback(() => setActiveTeam(null), [])

  return (
    <>
      <section
        id="teams"
        className="tr-section section-grid"
        aria-labelledby="tr-section-title"
      >
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="section-header-block" data-reveal>
          <div className="section-badge-row">
            <span className="badge-line" />

            <span className="section-badge-text">
              04 // DPL 2026 TEAMS
            </span>

            <span className="badge-line" />
          </div>

          <h2
            id="tr-section-title"
            className="section-heading-display"
          >
            DPL 2026
            <br />

            <span className="accent-gradient-blue">
              TEAMS REVEALED
            </span>
          </h2>

          <div className="heading-accent-line-blue" />

          <p className="section-lead-copy">
            The auction is over. The squads are locked.
            <br />
            Meet the players who will battle it out for the DPL 2026 title.
          </p>
        </div>

        {/* =====================================================
            AUCTION COMPLETE STATUS BAR
        ===================================================== */}

        <div className="tr-status-bar" data-reveal data-delay="1">
          <div className="tr-status-item">
            <span className="tr-status-dot tr-status-dot--done" aria-hidden="true" />
            <span className="tr-status-label">AUCTION COMPLETE</span>
          </div>

          <span className="tr-status-sep" aria-hidden="true">→</span>

          <div className="tr-status-item">
            <span className="tr-status-dot tr-status-dot--done" aria-hidden="true" />
            <span className="tr-status-label">TEAMS LOCKED</span>
          </div>

          <span className="tr-status-sep" aria-hidden="true">→</span>

          <div className="tr-status-item">
            <span className="tr-status-dot tr-status-dot--live" aria-hidden="true" />
            <span className="tr-status-label">SQUADS REVEALED</span>
          </div>
        </div>

        {/* =====================================================
            TEAMS GRID
        ===================================================== */}

        <div
          className="tr-teams-grid"
          role="list"
          aria-label="DPL 2026 teams"
        >
          {teams.map((team, idx) => (
            <div key={team.id} role="listitem">
              <TeamCard
                team={team}
                index={idx}
                onOpen={openModal}
              />
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          SQUAD MODAL (portal-like, rendered outside section)
      ===================================================== */}

      {activeTeam && (
        <SquadModal team={activeTeam} onClose={closeModal} />
      )}
    </>
  )
}
