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

export function TeamName({ team }) {
  return (team.nameLines || [team.name]).map((line) => <span key={line}>{line}</span>)
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

export function TeamLogoShowcase({ teams }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    teams.forEach((team) => {
      if (!team.logo) return
      const image = new window.Image()
      image.src = team.logo
    })
  }, [teams])

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = reducedMotionQuery.matches
    let timerId = null

    const stop = () => {
      if (timerId) window.clearInterval(timerId)
      timerId = null
    }

    const start = () => {
      stop()
      if (reducedMotionRef.current || document.hidden || teams.length < 2) return
      timerId = window.setInterval(() => {
        if (!document.hidden) {
          setActiveIndex((current) => (current + 1) % teams.length)
        }
      }, 750)
    }

    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    const handleMotionPreference = (event) => {
      reducedMotionRef.current = event.matches
      start()
    }

    const subscribeToMotionPreference = () => {
      if (reducedMotionQuery.addEventListener) {
        reducedMotionQuery.addEventListener('change', handleMotionPreference)
      } else {
        reducedMotionQuery.addListener(handleMotionPreference)
      }
    }

    const unsubscribeFromMotionPreference = () => {
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener('change', handleMotionPreference)
      } else {
        reducedMotionQuery.removeListener(handleMotionPreference)
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    subscribeToMotionPreference()
    start()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibility)
      unsubscribeFromMotionPreference()
    }
  }, [teams])

  const activeTeam = teams[activeIndex] || teams[0]

  if (!activeTeam) return null

  return (
    <div
      className="directory-logo-showcase"
      style={{ '--showcase-accent': activeTeam.accent, '--showcase-glow': activeTeam.accentGlow }}
      aria-label={`Featured team: ${activeTeam.name}`}
    >
      <div className="directory-showcase-orbit directory-showcase-orbit--outer" aria-hidden="true" />
      <div className="directory-showcase-orbit directory-showcase-orbit--inner" aria-hidden="true" />
      <div className="directory-showcase-particles" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <div className="directory-showcase-stage">
        <ImageWithFallback
          key={activeTeam.slug}
          src={activeTeam.logo}
          alt={`${activeTeam.name} logo`}
          fallback={getTeamInitials(activeTeam.name)}
          className="directory-showcase-logo"
          loading="eager"
        />
      </div>
      <div key={activeTeam.slug} className="directory-showcase-label" aria-live="polite">
        <span>TEAM {activeTeam.number}</span>
        <strong>{activeTeam.name}</strong>
      </div>
      <div className="directory-showcase-dots" aria-hidden="true">
        {teams.map((team, index) => <i className={index === activeIndex ? 'active' : ''} key={team.slug} />)}
      </div>
    </div>
  )
}

export function DirectoryHero({ teams }) {
  const heroRef = useRef(null)

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || !heroRef.current) return
    const bounds = heroRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    heroRef.current.style.setProperty('--pointer-x', `${x}%`)
    heroRef.current.style.setProperty('--pointer-y', `${y}%`)
    heroRef.current.style.setProperty('--showcase-parallax-x', `${(x - 50) * 0.08}px`)
    heroRef.current.style.setProperty('--showcase-parallax-y', `${(y - 50) * 0.05}px`)
  }

  return (
    <section ref={heroRef} className="directory-hero page-shell" aria-labelledby="directory-title" onPointerMove={handlePointerMove}>
      <div className="directory-hero-grid" aria-hidden="true" />
      <div className="directory-hero-copy">
        <div className="directory-eyebrow">
          <span className="directory-eyebrow-dot" />
          DPL 2026 <span>//</span> OFFICIAL SQUADS
        </div>
        <h1 id="directory-title">
          DPL 2026<br /><em>TEAMS</em>
        </h1>
        <p className="directory-hero-subtitle">THE FRANCHISES ARE SET.<br />THE SQUADS ARE READY.</p>
        <p className="directory-hero-supporting">
          Meet the 10 teams competing in the Data Premier League 2026.
        </p>
      </div>
      <div className="directory-hero-status" aria-label="DPL 2026 official squads">
        <div><span className="status-pulse" /><strong>10 TEAMS</strong></div>
        <div><span className="status-pulse" /><strong>50 PLAYERS</strong></div>
        <div><span className="status-pulse" /><strong>SQUADS LOCKED</strong></div>
      </div>
      <TeamLogoShowcase teams={teams} />
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
      aria-label={`View ${team.name} team experience`}
    >
      <span className="team-card-sweep" aria-hidden="true" />
      <div className="team-card-visual">
        <div className="team-card-visual-grid" aria-hidden="true" />
        <div className="team-card-topline">
          <span>{team.label}</span>
          <span>DPL 2026</span>
        </div>
        <div className="team-card-logo-row">
          <TeamLogo team={team} />
          <span className="team-card-index">{team.number}</span>
        </div>
      </div>
      <div className="team-card-info">
        <h2><TeamName team={team} /></h2>
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
          <h2 id="directory-grid-title">TEAM <em>DIRECTORY</em></h2>
        </div>
        <p>10 FRANCHISES<br />ONE TROPHY</p>
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
    if (!player) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const previousOverflowY = document.body.style.overflowY
    const previousScrollX = window.scrollX
    const previousScrollY = window.scrollY
    document.body.style.overflowY = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.overflowY = previousOverflowY
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true })
      window.scrollTo({ top: previousScrollY, left: previousScrollX, behavior: 'auto' })
    }
  }, [onClose, player])

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
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const squadSection = document.getElementById('squad')
    if (!squadSection || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setActiveSection(entry.isIntersecting ? 'squad' : 'overview'),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )

    observer.observe(squadSection)
    return () => observer.disconnect()
  }, [])

  const handleSectionClick = (event, sectionId) => {
    event.preventDefault()
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="team-subnav page-shell" style={{ '--team-accent': team.accent }} aria-label="Team detail sections">
      <a href="#overview" className={activeSection === 'overview' ? 'active' : ''} onClick={(event) => handleSectionClick(event, 'overview')}>OVERVIEW</a>
      <a href="#squad" className={activeSection === 'squad' ? 'active' : ''} onClick={(event) => handleSectionClick(event, 'squad')}>SQUAD</a>
    </nav>
  )
}
