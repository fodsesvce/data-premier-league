import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../Icons'
import { getTeamInitials } from '../../data/teams'
import './TeamDirectory.css'

const warnedImages = new Set()

function reportMissingImage(src) {
  if (import.meta.env.DEV && src && !warnedImages.has(src)) {
    warnedImages.add(src)
    console.warn(`[DPL teams] Missing image: ${src}`)
  }
}

export function ImageWithFallback({ src, alt, fallback, className = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(!src)

  useEffect(() => {
    setFailed(!src)
  }, [src])

  if (failed) {
    return (
      <div className={`${className} media-fallback`} aria-label={alt} role="img">
        <span>{fallback}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        reportMissingImage(src)
        setFailed(true)
      }}
    />
  )
}

export function TeamLogo({ team, large = false }) {
  return (
    <div className={`directory-logo ${large ? 'directory-logo--large' : ''}`}>
      <ImageWithFallback
        src={team.logo}
        alt={`${team.name} logo`}
        fallback={getTeamInitials(team.name)}
        className="directory-logo-image"
        loading="eager"
      />
      <span className="directory-logo-number" aria-hidden="true">{team.number}</span>
    </div>
  )
}

export function PlayerPhoto({ player, team, className = '' }) {
  const initials = player.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <ImageWithFallback
      src={player.image}
      alt={`${player.name} - ${team.name}`}
      fallback={initials}
      className={className}
    />
  )
}

export function DirectoryHero() {
  return (
    <section className="directory-hero page-shell" aria-labelledby="directory-title">
      <div className="directory-hero-grid" aria-hidden="true" />
      <div className="directory-hero-copy">
        <div className="directory-eyebrow">
          <span className="directory-eyebrow-dot" />
          DPL 2026 <span>//</span> OFFICIAL SQUADS
        </div>
        <h1 id="directory-title">
          DPL<br /><em>TEAMS</em>
        </h1>
        <p className="directory-hero-subtitle">THE FRANCHISES ARE SET. THE SQUADS ARE READY.</p>
        <p className="directory-hero-supporting">
          Meet the ten franchises that will compete in the Data Premier League.
        </p>
      </div>
      <div className="directory-hero-status" aria-label="DPL 2026 official squads">
        <span className="status-pulse" />
        <span>DPL 2026</span>
        <strong>OFFICIAL SQUADS</strong>
      </div>
      <div className="directory-hero-stat" aria-hidden="true">
        <span>10</span>
        <small>FRANCHISES<br />LOCKED</small>
      </div>
    </section>
  )
}

export function TeamCard({ team, index }) {
  return (
    <Link
      to={`/teams/${team.slug}`}
      className="directory-team-card"
      style={{
        '--team-accent': team.accent,
        '--team-strong': team.accentStrong,
        '--team-glow': team.accentGlow,
        '--card-delay': `${index * 70}ms`,
      }}
    >
      <span className="team-card-sweep" aria-hidden="true" />
      <div className="team-card-topline">
        <span>{team.label}</span>
        <span>DPL 2026</span>
      </div>
      <div className="team-card-logo-row">
        <TeamLogo team={team} />
        <span className="team-card-index">{team.number}</span>
      </div>
      <h2>{team.name}</h2>
      <div className="team-card-details">
        <div>
          <span>OWNER</span>
          <strong>{team.owner}</strong>
        </div>
        <div>
          <span>SQUAD</span>
          <strong>5 PLAYERS</strong>
        </div>
      </div>
      <div className="team-card-footer">
        <span>VIEW TEAM</span>
        <ArrowIcon direction="right" size={16} />
      </div>
    </Link>
  )
}

export function TeamGrid({ teams }) {
  return (
    <section className="directory-grid-section page-shell" aria-labelledby="directory-grid-title">
      <div className="directory-section-heading">
        <div>
          <span className="directory-kicker">01 // THE FRANCHISES</span>
          <h2 id="directory-grid-title">MEET THE <em>TEAMS</em></h2>
        </div>
        <p>Ten technology-led franchises.<br />One DPL 2026 season.</p>
      </div>
      <div className="directory-team-grid">
        {teams.map((team, index) => <TeamCard key={team.slug} team={team} index={index} />)}
      </div>
    </section>
  )
}

export function TeamMetadata({ team }) {
  return (
    <section className="team-metadata page-shell" aria-label={`${team.name} information`}>
      <div className="team-metadata-heading">
        <span className="directory-kicker">02 // FRANCHISE DATA</span>
        <h2>TEAM <em>INFORMATION</em></h2>
      </div>
      <div className="team-metadata-grid">
        <div><span>OWNER</span><strong>{team.owner}</strong></div>
        <div><span>SQUAD</span><strong>{team.members.length} MEMBERS</strong></div>
        <div><span>STATUS</span><strong>SQUAD CONFIRMED</strong></div>
        <div><span>SEASON</span><strong>DPL 2026</strong></div>
      </div>
    </section>
  )
}

export function SquadSection({ team, onPlayerSelect }) {
  return (
    <section id="squad" className="squad-section page-shell" aria-labelledby="squad-title">
      <div className="squad-heading">
        <div>
          <span className="directory-kicker">03 // OFFICIAL ROSTER</span>
          <h2 id="squad-title">THE <em>SQUAD</em></h2>
        </div>
        <p>THE 5 MEMBERS REPRESENTING<br />{team.shortName}</p>
      </div>
      <div className="squad-grid">
        {team.members.map((player, index) => (
          <button
            type="button"
            key={player.id}
            className="directory-player-card"
            style={{ '--team-accent': team.accent, '--team-glow': team.accentGlow, '--card-delay': `${index * 70}ms` }}
            onClick={() => onPlayerSelect(player)}
            aria-label={`View profile of ${player.name}`}
          >
            <div className="player-card-media">
              <span className="player-card-number">{player.number}</span>
              <PlayerPhoto player={player} team={team} className="player-card-photo" />
              <span className="player-card-overlay" aria-hidden="true" />
            </div>
            <div className="player-card-content">
              <span>{team.shortName}</span>
              <strong>{player.name}</strong>
              <small>DPL 2026 <i>•</i> SQUAD MEMBER</small>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

export function PlayerModal({ player, team, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [onClose])

  if (!player) return null

  return (
    <div
      className="player-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="player-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="player-modal-title"
        style={{ '--team-accent': team.accent, '--team-glow': team.accentGlow }}
      >
        <button ref={closeRef} type="button" className="player-modal-close" onClick={onClose} aria-label="Close player profile">×</button>
        <div className="player-modal-photo-wrap">
          <PlayerPhoto player={player} team={team} className="player-modal-photo" />
          <span className="player-modal-number">{player.number}</span>
        </div>
        <div className="player-modal-copy">
          <span className="directory-kicker">PLAYER {player.number}</span>
          <h2 id="player-modal-title">{player.name}</h2>
          <div className="player-modal-divider" />
          <span className="player-modal-team">{team.shortName}</span>
          <div className="player-modal-facts">
            <div><span>EDITION</span><strong>DPL 2026</strong></div>
            <div><span>STATUS</span><strong>{player.role.toUpperCase()}</strong></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TeamSubnav({ team }) {
  return (
    <nav className="team-subnav page-shell" style={{ '--team-accent': team.accent }} aria-label="Team detail sections">
      <a href="#overview" className="active">OVERVIEW</a>
      <a href="#squad">SQUAD</a>
      <button type="button" disabled aria-disabled="true">MATCHES <small>SOON</small></button>
      <button type="button" disabled aria-disabled="true">STATS <small>SOON</small></button>
      <button type="button" disabled aria-disabled="true">NEWS <small>SOON</small></button>
    </nav>
  )
}
