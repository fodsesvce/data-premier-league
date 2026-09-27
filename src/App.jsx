import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { useScrollReveal } from './hooks/useScrollReveal'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Why from './components/Why'
import Schedule from './components/Schedule'
import FinalCta from './components/FinalCta'

import CinematicLoader from './components/CinematicLoader'
import CricketCursor from './components/CricketCursor'
import InteractiveBackground from './components/InteractiveBackground'

import RegistrationClosed from './pages/RegistrationClosed'
import Admin from './pages/Admin'
import TeamsDirectory from './pages/TeamsDirectory'
import TeamDetail from './pages/TeamDetail'


function PublicSiteShell() {
  const location = useLocation()

  return (
    <>
      <InteractiveBackground />
      <CricketCursor />
      <Navbar />
      <div key={location.pathname} className="route-page-transition">
        <Outlet />
      </div>
      <FinalCta />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}


function HomePage() {
  const location = useLocation()

  useScrollReveal()

  useEffect(() => {
    const section = location.state?.scrollTo
    if (!section) return undefined

    const timeout = window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)

    return () => window.clearTimeout(timeout)
  }, [location.state])

  return (
    <div className="site-wrapper">

      {/* =====================================================
          MAIN WEBSITE
      ===================================================== */}

      <main className="main-content-stream">

        <Hero />

        <About />

        <Why />

        <Schedule />

      </main>
    </div>
  )
}


export default function App() {
  return (
    <BrowserRouter>

      <CinematicLoader />
      <ScrollToTop />

      <Routes>

        <Route element={<PublicSiteShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/teams" element={<TeamsDirectory />} />
          <Route path="/teams/:teamSlug" element={<TeamDetail />} />
          <Route path="/register" element={<RegistrationClosed />} />
        </Route>

        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>
  )
}
