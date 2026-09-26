import { useEffect, useRef, useState } from 'react'

const LANGUAGES = [
  'Python',
  'C',
  'C++',
  'Java',
]

const PROFICIENCY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
]


/* =========================================================
   FIELD ERROR
========================================================= */

function FieldError({ message }) {
  if (!message) return null

  return (
    <span className="registration-field-error">
      {message}
    </span>
  )
}


/* =========================================================
   CUSTOM LANGUAGE DROPDOWN
========================================================= */

function LanguageDropdown({
  value,
  onChange,
  error,
}) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  const selectedLanguage =
    LANGUAGES.find((language) => language === value) || ''

  /* Close when clicking outside */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  /* Keyboard support */
  function handleKeyDown(event) {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()
      setOpen((current) => !current)
    }

    if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  function selectLanguage(language) {
    onChange(language)
    setOpen(false)
  }

  return (
    <div
      className={`dpl-language-dropdown ${
        open ? 'is-open' : ''
      } ${error ? 'has-error' : ''}`}
      ref={dropdownRef}
    >

      {/* =================================================
          SELECT BUTTON
      ================================================= */}

      <button
        type="button"
        className={`dpl-language-trigger ${
          selectedLanguage
            ? 'has-value'
            : 'placeholder'
        }`}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
      >

        <span className="dpl-language-trigger-text">
          {selectedLanguage ||
            'Select your most comfortable language'}
        </span>

        <span
          className={`dpl-language-arrow ${
            open ? 'rotated' : ''
          }`}
        >
          ↓
        </span>

      </button>


      {/* =================================================
          CUSTOM OPTIONS
      ================================================= */}

      {open && (
        <div
          className="dpl-language-options"
          role="listbox"
          aria-label="Programming languages"
        >

          {LANGUAGES.map((language) => {

            const isSelected =
              selectedLanguage === language

            return (
              <button
                key={language}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`dpl-language-option ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() =>
                  selectLanguage(language)
                }
              >

                <span className="dpl-language-option-name">
                  {language}
                </span>

                {isSelected && (
                  <span className="dpl-language-option-check">
                    ✓
                  </span>
                )}

              </button>
            )
          })}

        </div>
      )}

    </div>
  )
}


/* =========================================================
   PROGRAMMING SKILLS
========================================================= */

export default function ProgrammingSkills({
  formData,
  updateForm,
  errors,
}) {
  return (
    <div className="registration-step">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="registration-step-header">

        <span className="registration-step-number">
          STEP 03
        </span>

        <h2>
          PROGRAMMING SKILLS
        </h2>

        <p>
          Tell us about the programming language you are most
          comfortable working with and your current proficiency
          level.
        </p>

      </div>


      {/* =====================================================
          MOST COMFORTABLE LANGUAGE
      ===================================================== */}

      <div className="registration-skill-section">

        <div className="registration-section-title">

          <span>
            01
          </span>

          <div>

            <h3>
              MOST COMFORTABLE PROGRAMMING LANGUAGE
            </h3>

            <p>
              Select exactly one language.
            </p>

          </div>

        </div>


        {/* =================================================
            LANGUAGE FIELD
        ================================================= */}

        <div className="registration-language-field">

          <label className="registration-select-label">
            Programming Language <span>*</span>
          </label>

          <LanguageDropdown
            value={formData.comfortableLanguage}
            onChange={(language) =>
              updateForm({
                comfortableLanguage: language,
              })
            }
            error={errors?.comfortableLanguage}
          />

          <FieldError
            message={errors?.comfortableLanguage}
          />

        </div>

      </div>


      {/* =====================================================
          PROFICIENCY
      ===================================================== */}

      <div className="registration-skill-section">

        <div className="registration-section-title">

          <span>
            02
          </span>

          <div>

            <h3>
              PROFICIENCY LEVEL
            </h3>

            <p>
              Choose the level that best describes your current
              ability in the selected language.
            </p>

          </div>

        </div>


        {/* =================================================
            PROFICIENCY OPTIONS
        ================================================= */}

        <div className="registration-proficiency-grid">

          {PROFICIENCY_LEVELS.map((level) => (

            <label
              key={level}
              className={`registration-proficiency-card ${
                formData.proficiency === level
                  ? 'selected'
                  : ''
              }`}
            >

              <input
                type="radio"
                name="proficiency"
                value={level}
                checked={
                  formData.proficiency === level
                }
                onChange={() =>
                  updateForm({
                    proficiency: level,
                  })
                }
              />

              <span>
                {level}
              </span>

            </label>

          ))}

        </div>

        <FieldError
          message={errors?.proficiency}
        />

      </div>

    </div>
  )
}