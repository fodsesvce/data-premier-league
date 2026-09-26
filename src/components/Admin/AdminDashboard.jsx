import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import ParticipantTable from './ParticipantTable'
import { exportParticipantsToExcel } from '../../utils/excelExport'

export default function AdminDashboard() {

  const [session, setSession] =
    useState(null)

  const [checkingAuth, setCheckingAuth] =
    useState(true)

  const [isAdmin, setIsAdmin] =
    useState(false)

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loginError, setLoginError] =
    useState('')

  const [loggingIn, setLoggingIn] =
    useState(false)

  const [participants, setParticipants] =
    useState([])

  const [loadingParticipants, setLoadingParticipants] =
    useState(false)

  const [search, setSearch] =
    useState('')

  const [department, setDepartment] =
    useState('ALL')

  const [year, setYear] =
    useState('ALL')

  const [status, setStatus] =
    useState('ALL')

  const [selectedParticipant, setSelectedParticipant] =
    useState(null)


  /* =========================================================
     AUTH
  ========================================================= */

  useEffect(() => {

    let mounted = true

    const initialize = async () => {

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession()

      if (!mounted) return

      setSession(session)

      if (session) {
        await checkAdmin()
      }

      setCheckingAuth(false)
    }

    initialize()


    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        async (
          _event,
          newSession
        ) => {

          if (!mounted) return

          setSession(newSession)

          if (newSession) {
            await checkAdmin()
          } else {
            setIsAdmin(false)
            setParticipants([])
          }
        }
      )


    return () => {
      mounted = false
      subscription.unsubscribe()
    }

  }, [])


  /* =========================================================
     CHECK ADMIN
  ========================================================= */

  const checkAdmin = async () => {

    const {
      data,
      error,
    } =
      await supabase.rpc(
        'is_admin'
      )

    if (error) {
      console.error(error)
      setIsAdmin(false)
      return
    }

    setIsAdmin(
      data === true
    )

    if (data === true) {
      await loadParticipants()
    }
  }


  /* =========================================================
     LOGIN
  ========================================================= */

  const login = async (event) => {

    event.preventDefault()

    setLoginError('')
    setLoggingIn(true)

    const {
      error,
    } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

    if (error) {
      setLoginError(
        error.message
      )
    }

    setLoggingIn(false)
  }


  /* =========================================================
     LOGOUT
  ========================================================= */

  const logout = async () => {

    await supabase.auth.signOut()

    setParticipants([])
    setIsAdmin(false)
  }


  /* =========================================================
     LOAD PARTICIPANTS
  ========================================================= */

  const loadParticipants = async () => {

    setLoadingParticipants(true)

    const {
      data,
      error,
    } =
      await supabase
        .from('participants')
        .select(`
          id,
          registration_id,
          full_name,
          college_registration_number,
          department,
          year,
          college_email,
          phone,
          photo_path,
          resume_path,
          status,
          created_at,
          participant_skills (
            id,
            language,
            rank,
            proficiency
          )
        `)
        .order(
          'created_at',
          {
            ascending: false,
          }
        )

    if (error) {
      console.error(error)
    } else {
      setParticipants(data || [])
    }

    setLoadingParticipants(false)
  }


  /* =========================================================
     FILTER
  ========================================================= */

  const filteredParticipants =
    useMemo(() => {

      const normalizedSearch =
        search
          .trim()
          .toLowerCase()

      return participants.filter(
        (participant) => {

          const matchesSearch =
            !normalizedSearch ||
            participant.full_name
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            participant.registration_id
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            participant.college_registration_number
              .toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            participant.college_email
              .toLowerCase()
              .includes(
                normalizedSearch
              )

          const matchesDepartment =
            department === 'ALL' ||
            participant.department ===
              department

          const matchesYear =
            year === 'ALL' ||
            participant.year === year

          const matchesStatus =
            status === 'ALL' ||
            participant.status === status

          return (
            matchesSearch &&
            matchesDepartment &&
            matchesYear &&
            matchesStatus
          )
        }
      )

    }, [
      participants,
      search,
      department,
      year,
      status,
    ])


  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(() => {

    return {
      total: participants.length,

      pending:
        participants.filter(
          (item) =>
            item.status === 'pending'
        ).length,

      verified:
        participants.filter(
          (item) =>
            item.status === 'verified'
        ).length,

      rejected:
        participants.filter(
          (item) =>
            item.status === 'rejected'
        ).length,
    }

  }, [participants])


  /* =========================================================
     EXPORT
  ========================================================= */

  const exportExcel = () => {

    exportParticipantsToExcel(
      filteredParticipants
    )
  }


  /* =========================================================
     LOADING
  ========================================================= */

  if (checkingAuth) {

    return (
      <div className="admin-loading">
        CHECKING ADMIN ACCESS...
      </div>
    )
  }


  /* =========================================================
     LOGIN
  ========================================================= */

  if (!session) {

    return (
      <div className="admin-login-page">

        <Link
          to="/"
          className="admin-login-back"
        >
          ← BACK TO DPL
        </Link>

        <form
          className="admin-login-card"
          onSubmit={login}
        >

          <span className="admin-kicker">
            DPL // SECURE ACCESS
          </span>

          <h1>
            ADMIN
            <span> PORTAL.</span>
          </h1>

          <p>
            Authorized DPL administrators only.
          </p>


          <label>
            EMAIL

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="admin@example.com"
              required
            />
          </label>


          <label>
            PASSWORD

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter password"
              required
            />
          </label>


          {loginError && (
            <div className="admin-login-error">
              {loginError}
            </div>
          )}


          <button
            type="submit"
            disabled={loggingIn}
          >
            {loggingIn
              ? 'AUTHENTICATING...'
              : 'ENTER ADMIN PORTAL →'}
          </button>

        </form>

      </div>
    )
  }


  /* =========================================================
     NOT ADMIN
  ========================================================= */

  if (!isAdmin) {

    return (
      <div className="admin-denied">

        <div>

          <span>
            403
          </span>

          <h1>
            ACCESS DENIED
          </h1>

          <p>
            Your account is authenticated but is not
            registered as a DPL administrator.
          </p>

          <button
            type="button"
            onClick={logout}
          >
            SIGN OUT
          </button>

        </div>

      </div>
    )
  }


  /* =========================================================
     ADMIN DASHBOARD
  ========================================================= */

  return (
    <div className="admin-dashboard">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="admin-header">

        <Link
          to="/"
          className="admin-brand"
        >

          <span>
            DPL
          </span>

          <div>
            <strong>
              DATA PREMIER LEAGUE
            </strong>

            <small>
              ADMINISTRATION CONSOLE
            </small>
          </div>

        </Link>


        <div className="admin-header-actions">

          <button
            type="button"
            onClick={loadParticipants}
          >
            REFRESH
          </button>

          <button
            type="button"
            onClick={exportExcel}
          >
            EXPORT EXCEL
          </button>

          <button
            type="button"
            onClick={logout}
          >
            SIGN OUT
          </button>

        </div>

      </header>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="admin-stats">

        <Stat
          label="TOTAL"
          value={stats.total}
        />

        <Stat
          label="PENDING"
          value={stats.pending}
        />

        <Stat
          label="VERIFIED"
          value={stats.verified}
        />

        <Stat
          label="REJECTED"
          value={stats.rejected}
        />

      </section>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="admin-filters">

        <input
          type="search"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search name, DPL ID, registration number or email..."
        />


        <select
          value={department}
          onChange={(event) =>
            setDepartment(
              event.target.value
            )
          }
        >

          <option value="ALL">
            All Departments
          </option>

          {[
            'AD',
            'AE',
            'BT',
            'CE',
            'CH',
            'CS',
            'EC',
            'EE',
            'IT',
            'ME',
            'MN',
            'MR',
          ].map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>


        <select
          value={year}
          onChange={(event) =>
            setYear(
              event.target.value
            )
          }
        >

          <option value="ALL">
            All Years
          </option>

          <option value="2nd Year">
            2nd Year
          </option>

          <option value="3rd Year">
            3rd Year
          </option>

          <option value="4th Year">
            4th Year
          </option>

        </select>


        <select
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value
            )
          }
        >

          <option value="ALL">
            All Status
          </option>

          <option value="uploading">
            Uploading
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="verified">
            Verified
          </option>

          <option value="rejected">
            Rejected
          </option>

        </select>

      </section>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <section className="admin-table-section">

        <div className="admin-table-heading">

          <div>
            <span>
              PARTICIPANTS
            </span>

            <strong>
              {filteredParticipants.length}
            </strong>
          </div>

          {loadingParticipants && (
            <small>
              REFRESHING...
            </small>
          )}

        </div>


        <ParticipantTable
          participants={
            filteredParticipants
          }
          onSelect={
            setSelectedParticipant
          }
        />

      </section>


      {/* =====================================================
          DETAIL PANEL
      ===================================================== */}

      {selectedParticipant && (
        <ParticipantDetail
          participant={
            selectedParticipant
          }
          onClose={() =>
            setSelectedParticipant(
              null
            )
          }
          onUpdated={async () => {
            await loadParticipants()

            setSelectedParticipant(
              null
            )
          }}
        />
      )}

    </div>
  )
}


/* =========================================================
   STAT
========================================================= */

function Stat({
  label,
  value,
}) {

  return (
    <div className="admin-stat">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  )
}


/* =========================================================
   PARTICIPANT DETAIL
========================================================= */

function ParticipantDetail({
  participant,
  onClose,
  onUpdated,
}) {

  const [photoUrl, setPhotoUrl] =
    useState('')

  const [loadingFile, setLoadingFile] =
    useState(false)

  const [updating, setUpdating] =
    useState(false)


  useEffect(() => {

    const loadPhoto = async () => {

      if (!participant.photo_path) {
        return
      }

      setLoadingFile(true)

      const {
        data,
        error,
      } =
        await supabase.storage
          .from('dpl-photos')
          .createSignedUrl(
            participant.photo_path,
            300
          )

      if (!error) {
        setPhotoUrl(
          data?.signedUrl || ''
        )
      }

      setLoadingFile(false)
    }

    loadPhoto()

  }, [
    participant.photo_path,
  ])


  const downloadResume = async () => {

    if (!participant.resume_path) {
      return
    }

    const {
      data,
      error,
    } =
      await supabase.storage
        .from('dpl-resumes')
        .createSignedUrl(
          participant.resume_path,
          300
        )

    if (error) {
      alert(
        'Unable to create resume download link.'
      )
      return
    }

    window.open(
      data.signedUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }


  const updateStatus = async (
    newStatus
  ) => {

    setUpdating(true)

    const {
      error,
    } =
      await supabase
        .from('participants')
        .update({
          status: newStatus,
        })
        .eq(
          'id',
          participant.id
        )

    if (error) {
      alert(
        error.message
      )
    } else {
      await onUpdated()
    }

    setUpdating(false)
  }


  return (
    <div
      className="admin-detail-overlay"
      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {
          onClose()
        }
      }}
    >

      <aside className="admin-detail-panel">

        <button
          type="button"
          className="admin-detail-close"
          onClick={onClose}
        >
          ×
        </button>


        <span className="admin-kicker">
          PARTICIPANT PROFILE
        </span>

        <h2>
          {participant.full_name}
        </h2>

        <strong className="admin-detail-id">
          {participant.registration_id}
        </strong>


        {photoUrl && (
          <img
            src={photoUrl}
            alt={`${participant.full_name} profile`}
            className="admin-participant-photo"
          />
        )}


        {loadingFile && (
          <div className="admin-file-loading">
            LOADING PHOTO...
          </div>
        )}


        <div className="admin-detail-grid">

          <Detail
            label="College Registration"
            value={
              participant.college_registration_number
            }
          />

          <Detail
            label="Department"
            value={
              participant.department
            }
          />

          <Detail
            label="Year"
            value={
              participant.year
            }
          />

          <Detail
            label="Email"
            value={
              participant.college_email
            }
          />

          <Detail
            label="Phone"
            value={
              participant.phone
            }
          />

          <Detail
            label="Status"
            value={
              participant.status
            }
          />

        </div>


        {/* =================================================
            SKILLS
        ================================================= */}

        <div className="admin-detail-section">

          <span>
            PROGRAMMING SKILLS
          </span>

          <div className="admin-detail-skills">

            {[
              ...(participant.participant_skills || []),
            ]
              .sort(
                (a, b) =>
                  (a.rank ?? 999) -
                  (b.rank ?? 999)
              )
              .map(
                (skill) => (
                  <div
                    key={skill.id}
                  >

                    <strong>
                      {skill.rank
                        ? `#${skill.rank}`
                        : 'OTHER'}
                    </strong>

                    <span>
                      {skill.language}
                    </span>

                    {skill.proficiency && (
                      <small>
                        {skill.proficiency}
                      </small>
                    )}

                  </div>
                )
              )}

          </div>

        </div>


        {/* =================================================
            RESUME
        ================================================= */}

        <div className="admin-detail-section">

          <span>
            RESUME
          </span>

          <button
            type="button"
            className="admin-resume-button"
            onClick={downloadResume}
          >
            OPEN / DOWNLOAD RESUME →
          </button>

        </div>


        {/* =================================================
            STATUS
        ================================================= */}

        <div className="admin-detail-actions">

          <button
            type="button"
            disabled={updating}
            onClick={() =>
              updateStatus(
                'verified'
              )
            }
          >
            VERIFY
          </button>

          <button
            type="button"
            disabled={updating}
            onClick={() =>
              updateStatus(
                'pending'
              )
            }
          >
            PENDING
          </button>

          <button
            type="button"
            disabled={updating}
            onClick={() =>
              updateStatus(
                'rejected'
              )
            }
          >
            REJECT
          </button>

        </div>

      </aside>

    </div>
  )
}


/* =========================================================
   DETAIL
========================================================= */

function Detail({
  label,
  value,
}) {

  return (
    <div>

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  )
}