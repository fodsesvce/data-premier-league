import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import InteractiveBackground from '../components/InteractiveBackground'
import CricketCursor from '../components/CricketCursor'
import { getTeamBySlug } from '../data/teams'
import {
  PlayerModal,
  SquadSection,
  TeamLogo,
  TeamMetadata,
  TeamSubnav,
} from '../components/teams/TeamDirectoryUi'

function TeamHero({ team }) {
  return (
    <section
      id="overview"
      className="team-detail-hero page-shell"
      style={{ '--team-accent': team.accent, '--team-strong': team.accentStrong, '--team-glow': team.accentGlow }}
      aria-labelledby="team-detail-title"
    >
      <div className="team-hero-art" aria-hidden="true">
        <span className="team-hero-orbit team-hero-orbit-one" />
        <span className="team-hero-orbit team-hero-orbit-two" />
        <span className="team-hero-grid" />
      </div>
      <div className="team-detail-copy">
        <Link to="/teams" className="back-to-teams"><span aria-hidden="true">←</span> BACK TO TEAMS</Link>
        <span className="directory-eyebrow"><span className="directory-eyebrow-dot" />DPL 2026 <span>//</span> OFFICIAL FRANCHISE</span>
        <h1 id="team-detail-title">{team.name.split(' ').map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}</h1>
        <p className="team-detail-summary">5 PLAYERS <i>•</i> SQUAD CONFIRMED</p>
        <div className="team-detail-owner"><span>OWNER</span><strong>{team.owner}</strong></div>
      </div>
      <div className="team-detail-logo-wrap">
        <TeamLogo team={team} large />
        <span className="team-detail-logo-caption">{team.label} / DPL 2026</span>
      </div>
    </section>
  )
}

function MissingTeam() {
  return (
    <div className="site-wrapper directory-page">
      <Navbar />
      <main className="team-missing page-shell">
        <span className="directory-kicker">404 // FRANCHISE NOT FOUND</span>
        <h1>THAT TEAM IS<br /><em>OFF THE BOARD.</em></h1>
        <Link to="/teams" className="directory-button">BACK TO TEAMS <span>→</span></Link>
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
      return
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
  }, [team])

  if (!team) return <MissingTeam />

  return (
    <div className="site-wrapper directory-page team-detail-page">
      <InteractiveBackground />
      <CricketCursor />
      <Navbar />
      <main className="directory-main">
        <TeamHero team={team} />
        <TeamSubnav team={team} />
        <TeamMetadata team={team} />
        <SquadSection team={team} onPlayerSelect={setSelectedPlayer} />
        <div className="detail-bottom-link page-shell">
          <Link to="/teams"><span aria-hidden="true">←</span> BACK TO ALL TEAMS</Link>
        </div>
      </main>
      <PlayerModal player={selectedPlayer} team={team} onClose={() => setSelectedPlayer(null)} />
    </div>
  )
}
