import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { useScrollReveal } from './hooks/useScrollReveal'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Why from './components/Why'
import Schedule from './components/Schedule'
import TeamsReveal from './components/TeamsReveal'
import FinalCta from './components/FinalCta'

import CinematicLoader from './components/CinematicLoader'
import CricketCursor from './components/CricketCursor'
import InteractiveBackground from './components/InteractiveBackground'

import RegistrationClosed from './pages/RegistrationClosed'
import Admin from './pages/Admin'
import TeamsDirectory from './pages/TeamsDirectory'
import TeamDetail from './pages/TeamDetail'


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
          CINEMATIC LOADER
      ===================================================== */}

      <CinematicLoader />

      {/* =====================================================
          GLOBAL VISUAL EFFECTS
      ===================================================== */}

      <InteractiveBackground />

      <CricketCursor />

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN WEBSITE
      ===================================================== */}

      <main className="main-content-stream">

        <Hero />

        <About />

        <Why />

        <Schedule />

        <TeamsReveal />

        <FinalCta />

      </main>
    </div>
  )
}


export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            PUBLIC HOME PAGE
        ================================================= */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/teams"
          element={<TeamsDirectory />}
        />

        <Route
          path="/teams/:teamSlug"
          element={<TeamDetail />}
        />

        {/* =================================================
            PARTICIPANT REGISTRATION
        ================================================= */}

        <Route
  path="/register"
  element={<RegistrationClosed />}
/>

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
