import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowIcon } from './Icons'

/*
 * ============================================================
 * DPL NAVIGATION
 * ============================================================
 *
 * DPL = Data Premier League
 *
 * Participant journey:
 * Individual Registration
 *   ↓
 * DPL Auction
 *   ↓
 * Get Picked
 *   ↓
 * Five-Member Team
 *   ↓
 * Online DPL League
 *   ↓
 * Top 4
 *   ↓
 * Knockouts
 *   ↓
 * Winner & Runner-up
 *
 * The auction is one stage of DPL,
 * not the name of the overall event.
 */

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const navItems = [
  ['home', 'HOME'],
  ['about', 'ABOUT DPL'],
  ['why-participate', 'WHY PARTICIPATE'],
  ['schedule', 'DPL JOURNEY'],
  ['teams', 'TEAMS'],
]

const sectionIds = [
  'home',
  'about',
  'why-participate',
  'schedule',
  'teams',
]

/* =========================================================
   REGISTRATION ROUTE
========================================================= */

/*
 * Registration is now handled inside the DPL website.
 *
 * Clicking REGISTER will navigate to:
 *
 *     /register
 *
 * No external Google Form is used anymore.
 */

const REGISTRATION_PATH = '/register'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = location.pathname === '/'
  const isTeamsRoute = location.pathname.startsWith('/teams')

  /* =========================================================
     SCROLL SPY
  ========================================================= */

  const handleScroll = useCallback(() => {
    if (!isHome) return

    setScrolled(window.scrollY > 40)

    const scrollPosition = window.scrollY + 160
    let currentSection = 'home'

    for (const id of sectionIds) {
      const element = document.getElementById(id)

      if (!element) continue

      const top = element.offsetTop
      const bottom = top + element.offsetHeight

      if (
        scrollPosition >= top &&
        scrollPosition < bottom
      ) {
        currentSection = id
        break
      }
    }

    /*
     * Keep TEAMS highlighted when the user reaches
     * the bottom of the landing page.
     */

    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 80
    ) {
      currentSection = 'teams'
    }

    setActive(currentSection)
  }, [isHome])

  useEffect(() => {
    setActive(isTeamsRoute ? 'teams' : isHome ? 'home' : '')

    if (!isHome) {
      setScrolled(false)
      return undefined
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, isHome, isTeamsRoute])

  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  const scrollTo = (id) => {
    setOpen(false)

    if (!isHome) {
      if (id === 'teams') navigate('/teams')
      else navigate('/', { state: { scrollTo: id } })
      return
    }

    const element = document.getElementById(id)

    if (!element) {
      if (id === 'teams') navigate('/teams')
      return
    }

    setActive(id)

    const NAV_OFFSET = 80

    const targetPosition =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      NAV_OFFSET

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    })
  }

  /* =========================================================
     REGISTRATION NAVIGATION
  ========================================================= */

  const goToRegistration = () => {
    setOpen(false)
    navigate(REGISTRATION_PATH)
  }

  const goHome = () => {
    setOpen(false)
    if (isHome) {
      scrollTo('home')
    } else {
      navigate('/')
    }
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <header className="nav-wrap">
      <nav
        className={`nav ${
          open ? 'nav-open' : ''
        } ${
          scrolled ? 'nav-scrolled' : ''
        }`}
        aria-label="DPL Data Premier League navigation"
      >

        {/* =====================================================
            BRAND
        ===================================================== */}

        <button
          type="button"
          className="brand-logo"
          onClick={goHome}
          aria-label="Go to DPL Data Premier League home"
        >
          <span className="brand-badge">
            DPL
          </span>

          <div className="brand-text">
            <b>DATA PREMIER</b>
            <span>LEAGUE</span>
          </div>
        </button>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <div className="nav-links">
          {navItems.map(([id, label]) => (
            <button
              type="button"
              key={id}
              className={`nav-link-btn ${
                active === id ? 'active' : ''
              }`}
              onClick={() => scrollTo(id)}
              aria-current={
                active === id
                  ? 'page'
                  : undefined
              }
            >
              {label}

              <span
                className="nav-active-pill"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="nav-actions">

          {/* ===================================================
              DESKTOP REGISTER BUTTON
          =================================================== */}

          <button
            type="button"
            className="nav-cta-btn"
            onClick={goToRegistration}
            aria-label="Register for Data Premier League"
          >
            <span>REGISTER</span>

            <ArrowIcon size={13} />
          </button>

          {/* ===================================================
              MOBILE MENU BUTTON
          =================================================== */}

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={
              open
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={open}
            aria-controls="dpl-navigation-menu"
            onClick={() =>
              setOpen((previous) => !previous)
            }
          >
            <span
              className={`bar ${
                open ? 'bar-top-x' : ''
              }`}
            />

            <span
              className={`bar ${
                open ? 'bar-mid-fade' : ''
              }`}
            />

            <span
              className={`bar ${
                open ? 'bar-bot-x' : ''
              }`}
            />
          </button>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}

        <div
          id="dpl-navigation-menu"
          className="nav-mobile-menu"
          aria-hidden={!open}
        >
          {navItems.map(([id, label]) => (
            <button
              type="button"
              key={id}
              className={`nav-mobile-link ${
                active === id ? 'active' : ''
              }`}
              onClick={() => scrollTo(id)}
              tabIndex={open ? 0 : -1}
            >
              <span>{label}</span>

              <ArrowIcon size={13} />
            </button>
          ))}

          {/* ===================================================
              MOBILE REGISTER BUTTON
          =================================================== */}

          <button
            type="button"
            className="nav-mobile-register"
            tabIndex={open ? 0 : -1}
            onClick={goToRegistration}
            aria-label="Register for Data Premier League"
          >
            <span>REGISTER FOR DPL</span>

            <ArrowIcon size={13} />
          </button>
        </div>
      </nav>
    </header>
  )
}
