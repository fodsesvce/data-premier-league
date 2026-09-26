export default function RegistrationReview({
  formData,
  databaseSkills,
  onEditStep,
}) {
  const selectedSkill = databaseSkills?.[0] || null

  return (
    <div className="registration-step">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="registration-step-header">

        <span className="registration-step-number">
          STEP 04
        </span>

        <h2>
          REVIEW YOUR REGISTRATION
        </h2>

        <p>
          Check your details carefully before submitting.
          You will receive a unique DPL registration ID
          after successful submission.
        </p>

      </div>


      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      <ReviewSection
        number="01"
        title="PERSONAL INFORMATION"
        onEdit={() => onEditStep(1)}
      >

        <ReviewRow
          label="Full Name"
          value={formData.fullName}
        />

        <ReviewRow
          label="Registration Number"
          value={formData.registrationNumber}
        />

        <ReviewRow
          label="Department"
          value={formData.department}
        />

        <ReviewRow
          label="Year"
          value={formData.year}
        />

        <ReviewRow
          label="College Email"
          value={formData.collegeEmail}
        />

        <ReviewRow
          label="Phone"
          value={formData.phone}
        />

      </ReviewSection>


      {/* =====================================================
          DOCUMENTS
      ===================================================== */}

      <ReviewSection
        number="02"
        title="DOCUMENTS"
        onEdit={() => onEditStep(2)}
      >

        <ReviewRow
          label="Resume"
          value={
            formData.resume?.name ||
            'Not selected'
          }
          success={Boolean(formData.resume)}
        />

      </ReviewSection>


      {/* =====================================================
          PROGRAMMING SKILLS
      ===================================================== */}

      <ReviewSection
        number="03"
        title="PROGRAMMING SKILLS"
        onEdit={() => onEditStep(3)}
      >

        {selectedSkill ? (

          <div className="review-skill-list">

            <div className="review-skill">

              {/* Most comfortable label */}

              <span className="review-skill-rank">
                MOST COMFORTABLE
              </span>

              {/* Selected language */}

              <strong>
                {selectedSkill.language}
              </strong>

              {/* Proficiency */}

              <span className="review-proficiency">
                {selectedSkill.proficiency}
              </span>

            </div>

          </div>

        ) : (

          <div className="review-empty">
            No programming language selected.
          </div>

        )}

      </ReviewSection>


      {/* =====================================================
          AGREEMENT
      ===================================================== */}

      <div className="registration-confirmation-box">

        <div className="registration-confirmation-icon">
          ✓
        </div>

        <div>

          <strong>
            READY TO ENTER DPL?
          </strong>

          <p>
            By submitting this registration, you confirm
            that the information provided is accurate.
            Every registered participant enters the DPL
            auction.
          </p>

        </div>

      </div>

    </div>
  )
}


/* =========================================================
   REVIEW SECTION
========================================================= */

function ReviewSection({
  number,
  title,
  onEdit,
  children,
}) {
  return (
    <section className="review-section">

      <div className="review-section-header">

        <div>

          <span>
            {number}
          </span>

          <h3>
            {title}
          </h3>

        </div>

        <button
          type="button"
          onClick={onEdit}
        >
          EDIT
        </button>

      </div>

      <div className="review-content">
        {children}
      </div>

    </section>
  )
}


/* =========================================================
   REVIEW ROW
========================================================= */

function ReviewRow({
  label,
  value,
  success = false,
}) {
  return (
    <div className="review-row">

      <span>
        {label}
      </span>

      <strong>

        {success && (
          <em>
            ✓
          </em>
        )}

        {value || '—'}

      </strong>

    </div>
  )
}