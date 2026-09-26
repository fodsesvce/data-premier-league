const DEPARTMENTS = [
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
]

const YEARS = [
  '2nd Year',
  '3rd Year',
  '4th Year',
]

function FieldError({ message }) {
  if (!message) return null

  return (
    <span className="registration-field-error">
      {message}
    </span>
  )
}

export default function PersonalDetails({
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
          STEP 01
        </span>

        <h2>
          PERSONAL INFORMATION
        </h2>

        <p>
          Tell us who you are. All fields marked with
          <strong> *</strong> are required.
        </p>

      </div>


      {/* =====================================================
          FULL NAME
      ===================================================== */}

      <div className="registration-field">

        <label htmlFor="fullName">
          Full Name <span>*</span>
        </label>

        <input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(event) =>
            updateForm({
              fullName: event.target.value,
            })
          }
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={100}
        />

        <FieldError
          message={errors.fullName}
        />

      </div>


      {/* =====================================================
          COLLEGE REGISTRATION NUMBER
      ===================================================== */}

      <div className="registration-field">

        <label htmlFor="registrationNumber">
          College Registration Number <span>*</span>
        </label>

        <input
          id="registrationNumber"
          type="text"
          value={formData.registrationNumber}
          onChange={(event) =>
            updateForm({
              registrationNumber: event.target.value,
            })
          }
          placeholder="Enter your college registration number"
          autoComplete="off"
          maxLength={50}
        />

        <FieldError
          message={errors.registrationNumber}
        />

      </div>


      {/* =====================================================
          DEPARTMENT
      ===================================================== */}

      <fieldset className="registration-fieldset">

        <legend>
          Department <span>*</span>
        </legend>

        <div className="registration-radio-grid">

          {DEPARTMENTS.map((department) => (
            <label
              key={department}
              className={`registration-radio-card ${
                formData.department === department
                  ? 'selected'
                  : ''
              }`}
            >

              <input
                type="radio"
                name="department"
                value={department}
                checked={
                  formData.department === department
                }
                onChange={() =>
                  updateForm({
                    department,
                  })
                }
              />

              <span className="custom-radio" />

              <span>
                {department}
              </span>

            </label>
          ))}

        </div>

        <FieldError
          message={errors.department}
        />

      </fieldset>


      {/* =====================================================
          YEAR
      ===================================================== */}

      <fieldset className="registration-fieldset">

        <legend>
          Year <span>*</span>
        </legend>

        <div className="registration-year-grid">

          {YEARS.map((year) => (
            <label
              key={year}
              className={`registration-radio-card ${
                formData.year === year
                  ? 'selected'
                  : ''
              }`}
            >

              <input
                type="radio"
                name="year"
                value={year}
                checked={
                  formData.year === year
                }
                onChange={() =>
                  updateForm({
                    year,
                  })
                }
              />

              <span className="custom-radio" />

              <span>
                {year}
              </span>

            </label>
          ))}

        </div>

        <FieldError
          message={errors.year}
        />

      </fieldset>


      {/* =====================================================
          COLLEGE EMAIL
      ===================================================== */}

      <div className="registration-field">

        <label htmlFor="collegeEmail">
          College Mail ID <span>*</span>
        </label>

        <input
          id="collegeEmail"
          type="email"
          value={formData.collegeEmail}
          onChange={(event) =>
            updateForm({
              collegeEmail: event.target.value,
            })
          }
          placeholder="yourname@college.edu"
          autoComplete="email"
          maxLength={150}
        />

        <FieldError
          message={errors.collegeEmail}
        />

      </div>


      {/* =====================================================
          PHONE NUMBER
      ===================================================== */}

      <div className="registration-field">

        <label htmlFor="phone">
          Phone Number <span>*</span>
        </label>

        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(event) => {

            const value =
              event.target.value.replace(/\D/g, '')

            updateForm({
              phone: value,
            })
          }}
          placeholder="10-digit mobile number"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
        />

        <FieldError
          message={errors.phone}
        />

      </div>


      {/* =====================================================
          PHOTO UPLOAD
      ===================================================== */}

      <div className="registration-document-card">

        <div className="registration-document-heading">

          <span className="registration-document-number">
            07
          </span>

          <div>
            <h3>
              PROFILE PHOTO <span>*</span>
            </h3>

            <p>
              Upload a clear recent photograph of yourself.
            </p>
          </div>

        </div>


        <label
          htmlFor="photo"
          className="registration-upload-area"
        >

          <input
            id="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {

              const file =
                event.target.files?.[0] || null

              updateForm({
                photo: file,
              })
            }}
          />


          <span className="registration-upload-symbol">
            ↑
          </span>


          <strong>
            {formData.photo
              ? formData.photo.name
              : 'CLICK TO UPLOAD PHOTO'}
          </strong>


          <small>
            JPG / PNG / WEBP • MAXIMUM 2 MB
          </small>

        </label>


        <FieldError
          message={errors.photo}
        />

      </div>


      {/* =====================================================
          PHOTO INFORMATION
      ===================================================== */}

      <div className="registration-info-box">

        <strong>
          PHOTO REQUIREMENTS
        </strong>

        <p>
          Upload a clear recent photo with your face visible.
          Accepted formats are JPG, PNG and WEBP.
          Maximum file size is 2 MB.
        </p>

      </div>

    </div>
  )
}