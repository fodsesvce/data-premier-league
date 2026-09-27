import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowIcon } from '../components/Icons'
import { getTeamBySlug } from '../data/teams'
import {
  PlayerModal,
  SquadSection,
  TeamLogo,
  TeamMetadata,
  TeamSubnav,
} from '../components/teams/TeamDirectoryUi'

function TeamPageHero({ team }) {
  const heroRef = useRef(null)

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || !heroRef.current) return
    const bounds = heroRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    heroRef.current.style.setProperty('--pointer-x', `${x}%`)
    heroRef.current.style.setProperty('--pointer-y', `${y}%`)
  }

  return (
    <section
      ref={heroRef}
      id="overview"
      className="team-page-hero"
      style={{ '--team-accent': team.accent, '--team-strong': team.accentStrong, '--team-glow': team.accentGlow }}
      onPointerMove={handlePointerMove}
      aria-labelledby="team-page-title"
    >
      <div className="team-page-hero-lines" aria-hidden="true" />
      <div className="team-page-hero-logo-shadow" aria-hidden="true">{team.number}</div>
      <div className="team-page-hero-copy page-shell">
        <Link to="/teams" className="team-page-back"><span aria-hidden="true">←</span> BACK TO TEAMS</Link>
        <span className="directory-eyebrow"><span className="directory-eyebrow-dot" />DPL 2026 <span>//</span> OFFICIAL FRANCHISE</span>
        <h1 id="team-page-title">{team.name}</h1>
        <p className="team-page-summary">5 PLAYERS <i>•</i> SQUAD CONFIRMED</p>
        <div className="team-page-owner"><span>OWNER</span><strong>{team.owner}</strong></div>
      </div>
      <div className="team-page-hero-logo">
        <TeamLogo team={team} large />
        <span>{team.label} / DPL 2026</span>
      </div>
      <a className="team-page-scroll" href="#squad">
        <span>SCROLL TO SQUAD</span>
        <ArrowIcon direction="down" size={16} />
      </a>
    </section>
  )
}

function MissingTeam() {
  const navigate = useNavigate()

  return (
    <div className="site-wrapper directory-page team-detail-page">
      <main className="team-page-missing page-shell">
        <span className="directory-kicker">404 // FRANCHISE NOT FOUND</span>
        <h1>THAT TEAM IS<br /><em>OFF THE BOARD.</em></h1>
        <button type="button" className="directory-button" onClick={() => navigate('/teams')}>BACK TO TEAMS <span>→</span></button>
      </main>
    </div>
  )
}

export default function TeamDetail() {
  const { teamSlug } = useParams()
  const team = getTeamBySlug(teamSlug)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  useEffect(() => {
    if (!team) {
      document.title = 'Team Not Found | DPL 2026'
      return undefined
    }

    document.title = `${team.name} | DPL 2026`
    const description = `${team.name} official DPL 2026 squad, owned by ${team.owner}. Meet all five squad members.`
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
    window.scrollTo(0, 0)
    return undefined
  }, [team])

  if (!team) return <MissingTeam />

  return (
    <div className="site-wrapper directory-page team-detail-page">
      <main className="team-page-main">
        <TeamPageHero team={team} />
        <TeamSubnav team={team} />
        <TeamMetadata team={team} />
        <SquadSection team={team} onPlayerSelect={setSelectedPlayer} />
        <section className="team-page-cta" aria-label="Explore all DPL teams">
          <span className="directory-kicker">DPL 2026 // THE FULL DIRECTORY</span>
          <h2>EXPLORE ALL <em>DPL TEAMS</em></h2>
          <Link to="/teams"><span aria-hidden="true">←</span> BACK TO TEAMS</Link>
        </section>
      </main>
      <PlayerModal player={selectedPlayer} team={team} onClose={() => setSelectedPlayer(null)} />
    </div>
  )
}
