import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import InteractiveBackground from '../components/InteractiveBackground'
import CricketCursor from '../components/CricketCursor'
import { teams } from '../data/teams'
import { DirectoryHero, TeamGrid } from '../components/teams/TeamDirectoryUi'

export default function TeamsDirectory() {
  useEffect(() => {
    document.title = 'DPL 2026 Teams | Data Premier League'
    const description = 'Meet the ten official franchises and squads competing in the DPL 2026 Data Premier League.'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="site-wrapper directory-page">
      <InteractiveBackground />
      <CricketCursor />
      <Navbar />
      <main className="directory-main">
        <DirectoryHero />
        <TeamGrid teams={teams} />
        <section className="directory-footer-band page-shell" aria-label="DPL season information">
          <span>DPL 2026</span>
          <strong>THE SQUADS ARE READY.</strong>
          <span>DATA PREMIER LEAGUE</span>
        </section>
      </main>
    </div>
  )
}
