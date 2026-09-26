function FieldError({ message }) {
  if (!message) return null

  return (
    <span className="registration-field-error">
      {message}
    </span>
  )
}

export default function ResumeUpload({
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
          STEP 02
        </span>

        <h2>
          RESUME
        </h2>

        <p>
          Upload your latest resume in PDF format.
          Your resume is stored securely and is accessible
          only to authorized DPL administrators.
        </p>

      </div>


      {/* =====================================================
          RESUME UPLOAD
      ===================================================== */}

      <div className="registration-document-card">

        <div className="registration-document-heading">

          <span className="registration-document-number">
            01
          </span>

          <div>
            <h3>
              RESUME
            </h3>

            <p>
              Upload your latest resume in PDF format.
            </p>
          </div>

        </div>


        <label
          htmlFor="resume"
          className="registration-upload-area"
        >

          <input
            id="resume"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => {
              const file =
                event.target.files?.[0] || null

              updateForm({
                resume: file,
              })
            }}
          />

          <span className="registration-upload-symbol">
            ↑
          </span>

          <strong>
            {formData.resume
              ? formData.resume.name
              : 'CLICK TO UPLOAD RESUME'}
          </strong>

          <small>
            PDF ONLY • MAXIMUM 5 MB
          </small>

        </label>

        <FieldError
          message={errors.resume}
        />

      </div>


      {/* =====================================================
          INFORMATION
      ===================================================== */}

      <div className="registration-info-box">

        <strong>
          DOCUMENT SECURITY
        </strong>

        <p>
          Your resume is stored in private DPL storage.
          It is not publicly listed and can only be accessed
          by authorized DPL administrators.
        </p>

      </div>

    </div>
  )
}