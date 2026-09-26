import { BrowserRouter, Routes, Route } from 'react-router-dom'

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


function HomePage() {
  useScrollReveal()

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