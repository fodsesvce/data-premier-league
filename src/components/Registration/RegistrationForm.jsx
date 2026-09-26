import { useEffect, useMemo, useState } from 'react'

import PersonalDetails from './PersonalDetails'
import ResumeUpload from './ResumeUpload'
import ProgrammingSkills from './ProgrammingSkills'
import RegistrationReview from './RegistrationReview'
import RegistrationSuccess from './RegistrationSuccess'

import { supabase } from '../../lib/supabase'

import {
  validatePersonalDetails,
  validateDocuments,
  validateProgrammingSkills,
} from '../../utils/validation'


/* =========================================================
   INITIAL FORM
========================================================= */

const INITIAL_FORM = {

  /* -------------------------------------------------------
     PERSONAL DETAILS
  ------------------------------------------------------- */

  fullName: '',
  registrationNumber: '',
  department: '',
  year: '',
  collegeEmail: '',
  phone: '',


  /* -------------------------------------------------------
     PHOTO
  ------------------------------------------------------- */

  photo: null,


  /* -------------------------------------------------------
     DOCUMENTS
  ------------------------------------------------------- */

  resume: null,


  /* -------------------------------------------------------
     PROGRAMMING SKILLS
  ------------------------------------------------------- */

  comfortableLanguage: '',
  proficiency: '',
}


/* =========================================================
   PHOTO VALIDATION
========================================================= */

const validatePhoto = (formData) => {

  const errors = {}

  const photo = formData.photo


  /* -------------------------------------------------------
     REQUIRED
  ------------------------------------------------------- */

  if (!photo) {

    errors.photo =
      'Please upload your profile photo.'

    return errors
  }


  /* -------------------------------------------------------
     FILE TYPE
  ------------------------------------------------------- */

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  if (!allowedTypes.includes(photo.type)) {

    errors.photo =
      'Photo must be JPG, PNG or WEBP.'

    return errors
  }


  /* -------------------------------------------------------
     FILE SIZE
     10 MB
  ------------------------------------------------------- */

  const maxSize =
    10 * 1024 * 1024

  if (photo.size > maxSize) {

    errors.photo =
      'Photo must be smaller than 10 MB.'

    return errors
  }


  return errors
}


/* =========================================================
   COMPONENT
========================================================= */

export default function RegistrationForm() {

  /* =======================================================
     STATE
  ======================================================= */

  const [step, setStep] = useState(1)

  const [formData, setFormData] =
    useState(INITIAL_FORM)

  const [errors, setErrors] =
    useState({})

  const [submitError, setSubmitError] =
    useState('')

  const [submitting, setSubmitting] =
    useState(false)

  const [registrationResult, setRegistrationResult] =
    useState(null)

  /*
    Current submission stage shown in the full-screen
    submission overlay.
  */
  const [submissionStage, setSubmissionStage] =
    useState('')


  /* =======================================================
     PREVENT ACCIDENTAL REFRESH / CLOSE DURING SUBMISSION
  ======================================================= */

  useEffect(() => {

    if (!submitting) {
      return
    }

    const handleBeforeUnload = (event) => {

      event.preventDefault()

      event.returnValue =
        'Your registration is being submitted. Please wait until the submission is complete.'

      return event.returnValue
    }

    window.addEventListener(
      'beforeunload',
      handleBeforeUnload
    )

    return () => {

      window.removeEventListener(
        'beforeunload',
        handleBeforeUnload
      )
    }

  }, [submitting])


  /* =======================================================
     UPDATE FORM
  ======================================================= */

  const updateForm = (updates) => {

    setFormData((previous) => ({
      ...previous,
      ...updates,
    }))

    setErrors({})

    setSubmitError('')
  }


  /* =======================================================
     STEP VALIDATION
  ======================================================= */

  const validateCurrentStep = () => {

    let validationErrors = {}


    /* -----------------------------------------------------
       STEP 1
    ----------------------------------------------------- */

    if (step === 1) {

      validationErrors =
        validatePersonalDetails(formData)


      /*
        Photo is part of Step 1.
      */

      const photoErrors =
        validatePhoto(formData)


      validationErrors = {
        ...validationErrors,
        ...photoErrors,
      }
    }


    /* -----------------------------------------------------
       STEP 2
    ----------------------------------------------------- */

    if (step === 2) {

      validationErrors =
        validateDocuments(formData)
    }


    /* -----------------------------------------------------
       STEP 3
    ----------------------------------------------------- */

    if (step === 3) {

      validationErrors =
        validateProgrammingSkills(formData)
    }


    setErrors(validationErrors)

    return (
      Object.keys(validationErrors).length === 0
    )
  }


  /* =======================================================
     NEXT STEP
  ======================================================= */

  const nextStep = () => {

    if (!validateCurrentStep()) {

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }


    setStep((previous) =>
      Math.min(previous + 1, 4)
    )


    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  /* =======================================================
     PREVIOUS STEP
  ======================================================= */

  const previousStep = () => {

    setErrors({})

    setSubmitError('')


    setStep((previous) =>
      Math.max(previous - 1, 1)
    )


    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  /* =======================================================
     SKILLS FOR DATABASE

     Exactly ONE skill is stored.
  ======================================================= */

  const databaseSkills = useMemo(() => {

    if (!formData.comfortableLanguage) {
      return []
    }


    return [
      {
        language:
          formData.comfortableLanguage,

        rank: 1,

        proficiency:
          formData.proficiency || null,
      },
    ]

  }, [
    formData.comfortableLanguage,
    formData.proficiency,
  ])


  /* =======================================================
     FILE UPLOAD
  ======================================================= */

  const uploadFile = async (
    bucket,
    path,
    file
  ) => {

    if (!file) {

      throw new Error(
        'Required file is missing.'
      )
    }


    const {
      error,
    } = await supabase.storage
      .from(bucket)
      .upload(
        path,
        file,
        {
  cacheControl: '3600',
  upsert: false,
  contentType: file.type,
}
      )


    if (error) {

      throw new Error(
        `Unable to upload ${file.name}: ${error.message}`
      )
    }


    return path
  }


  /* =======================================================
     SUBMIT REGISTRATION
  ======================================================= */

  const submitRegistration = async () => {

    setSubmitError('')


    /* -----------------------------------------------------
       FINAL PERSONAL VALIDATION
    ----------------------------------------------------- */

    const personalValidation =
      validatePersonalDetails(formData)


    const photoValidation =
      validatePhoto(formData)


    const completePersonalValidation = {
      ...personalValidation,
      ...photoValidation,
    }


    if (
      Object.keys(completePersonalValidation).length > 0
    ) {

      setErrors(
        completePersonalValidation
      )

      setStep(1)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }


    /* -----------------------------------------------------
       DOCUMENT VALIDATION
    ----------------------------------------------------- */

    const documentValidation =
      validateDocuments(formData)


    if (
      Object.keys(documentValidation).length > 0
    ) {

      setErrors(documentValidation)

      setStep(2)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }


    /* -----------------------------------------------------
       SKILL VALIDATION
    ----------------------------------------------------- */

    const skillsValidation =
      validateProgrammingSkills(formData)


    if (
      Object.keys(skillsValidation).length > 0
    ) {

      setErrors(skillsValidation)

      setStep(3)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }


    /* =====================================================
       START SUBMISSION
    ===================================================== */

    setSubmitting(true)

    setSubmissionStage(
      'Saving your registration details...'
    )


    /*
      PERFORMANCE TIMER

      This does not affect the registration process.
      It only measures how long each operation takes.
    */

    const submissionStart =
      performance.now()


    console.info(
      '[DPL Registration] Starting submission...'
    )


    let submissionToken = null


    try {

      /* ===================================================
         1. CREATE PARTICIPANT
      =================================================== */

      const registerStart =
        performance.now()


      const {
        data,
        error,
      } = await supabase.rpc(
        'register_participant',
        {

          p_full_name:
            formData.fullName.trim(),

          p_college_registration_number:
            formData.registrationNumber.trim(),

          p_department:
            formData.department,

          p_year:
            formData.year,

          p_college_email:
            formData.collegeEmail.trim(),

          p_phone:
            formData.phone.trim(),

          p_skills:
            databaseSkills,
        }
      )


      const registerDuration =
        performance.now() -
        registerStart


      console.info(
        `[DPL Registration] register_participant: ${registerDuration.toFixed(0)} ms`
      )


      /* ---------------------------------------------------
         RPC ERROR
      --------------------------------------------------- */

      if (error) {

        console.error(
          'register_participant RPC error:',
          error
        )

        throw new Error(
          error.message
        )
      }


      /* ---------------------------------------------------
         CHECK RESPONSE
      --------------------------------------------------- */

      if (
        !data ||
        !data[0]
      ) {

        throw new Error(
          'Registration could not be created.'
        )
      }


      const participant =
        data[0]


      /* ---------------------------------------------------
         TOKEN
      --------------------------------------------------- */

      submissionToken =
        participant.submission_token


      /* ---------------------------------------------------
         REGISTRATION ID
      --------------------------------------------------- */

      const registrationId =
        participant.registration_id


      if (!submissionToken) {

        throw new Error(
          'Registration was created, but the submission token was not returned.'
        )
      }


      if (!registrationId) {

        throw new Error(
          'Registration was created, but the registration ID was not returned.'
        )
      }


      /* ===================================================
         2. CREATE FILE PATHS
      =================================================== */

      const photoExtension =
        formData.photo.name
          .split('.')
          .pop()
          ?.toLowerCase() || 'jpg'


      const uploadAttemptId =
  crypto.randomUUID()

const photoPath =
  `${submissionToken}/${uploadAttemptId}/photo.${photoExtension}`

const resumePath =
  `${submissionToken}/${uploadAttemptId}/resume.pdf`


      /* ===================================================
         3 & 4. UPLOAD PHOTO + RESUME IN PARALLEL
      =================================================== */

      /*
        Both files are uploaded simultaneously.

        The overlay remains visible during the entire
        process so the user knows the registration is
        actively being processed.
      */

      setSubmissionStage(
        'Uploading your photo and resume...'
      )


      const uploadStart =
        performance.now()


      await Promise.all([
        uploadFile(
          'dpl-photos',
          photoPath,
          formData.photo
        ),

        uploadFile(
          'dpl-resumes',
          resumePath,
          formData.resume
        ),
      ])


      const uploadDuration =
        performance.now() -
        uploadStart


      console.info(
        `[DPL Registration] Photo + Resume uploads: ${uploadDuration.toFixed(0)} ms`
      )


      /* ===================================================
         5. FINALIZE REGISTRATION
      =================================================== */

      setSubmissionStage(
        'Finalizing your registration...'
      )


      const finalizeStart =
        performance.now()


      const {
        error: finalizeError,
      } = await supabase.rpc(
        'finalize_registration',
        {

          p_submission_token:
            submissionToken,

          p_photo_path:
            photoPath,

          p_resume_path:
            resumePath,
        }
      )


      const finalizeDuration =
        performance.now() -
        finalizeStart


      console.info(
        `[DPL Registration] finalize_registration: ${finalizeDuration.toFixed(0)} ms`
      )


      /* ---------------------------------------------------
         FINALIZE ERROR
      --------------------------------------------------- */

      if (finalizeError) {

        console.error(
          'finalize_registration RPC error:',
          finalizeError
        )

        throw new Error(
          finalizeError.message
        )
      }


      /* ===================================================
         TOTAL TIME
      =================================================== */

      const totalDuration =
        performance.now() -
        submissionStart


      console.info(
        `[DPL Registration] TOTAL: ${(totalDuration / 1000).toFixed(2)} seconds`
      )


      /* ===================================================
         6. SUCCESS
      =================================================== */

      setSubmissionStage(
        'Registration completed successfully!'
      )


      setRegistrationResult({

        registrationId,

        email:
          formData.collegeEmail.trim(),

        name:
          formData.fullName.trim(),

      })


      /*
        Give React a moment to display the completed
        message before moving to the success screen.
      */

      setTimeout(() => {

        setStep(5)

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

      }, 700)


    } catch (error) {

      /* ===================================================
         ERROR HANDLING
      =================================================== */

      console.error(
        'DPL registration error:',
        error
      )


      const errorMessage =
        error?.message?.toLowerCase() || ''


      const errorCode =
        error?.code || ''


      /* ===================================================
         DUPLICATE REGISTRATION
      =================================================== */

      const isDuplicateRegistration =
        errorCode === '23505' ||
        errorMessage.includes(
          'duplicate key value violates unique constraint'
        ) ||
        errorMessage.includes(
          'unique constraint'
        )


      if (isDuplicateRegistration) {

        setSubmitError(
          'A registration with these details has already been submitted. Please check your registration details or contact the organizers if you believe this is an error.'
        )

        return
      }


      /* ===================================================
         OTHER ERRORS
      =================================================== */

      let message =
        error?.message ||
        'Something went wrong while submitting your registration. Please try again.'


      if (
        message
          .toLowerCase()
          .includes(
            'could not find the function'
          )
      ) {

        message =
          `Supabase registration function mismatch: ${message}`
      }


      setSubmitError(message)

    } finally {

      setSubmitting(false)

    }
  }


  /* =======================================================
     SUCCESS SCREEN
  ======================================================= */

  if (
    step === 5 &&
    registrationResult
  ) {

    return (
      <RegistrationSuccess

        registrationId={
          registrationResult.registrationId
        }

        email={
          registrationResult.email
        }

        name={
          registrationResult.name
        }

      />
    )
  }


  /* =======================================================
     STEP LABELS
  ======================================================= */

  const stepLabels = [
    'PERSONAL',
    'DOCUMENTS',
    'SKILLS',
    'REVIEW',
  ]


  /* =======================================================
     SUBMISSION OVERLAY
  ======================================================= */

  const submissionOverlay = submitting && (

    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background:
          'rgba(3, 5, 10, 0.96)',
        backdropFilter:
          'blur(14px)',
        WebkitBackdropFilter:
          'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background:
            'linear-gradient(145deg, #0d111b, #080a0f)',
          border:
            '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '20px',
          padding:
            '38px 32px',
          boxShadow:
            '0 30px 100px rgba(0, 0, 0, 0.65), 0 0 50px rgba(56, 189, 248, 0.08)',
        }}
      >

        {/* -------------------------------------------------
            ICON / LOADER
        ------------------------------------------------- */}

        <div
          style={{
            width: '72px',
            height: '72px',
            margin: '0 auto 26px',
            borderRadius: '50%',
            border:
              '3px solid rgba(56, 189, 248, 0.15)',
            borderTopColor:
              '#38bdf8',
            animation:
              'dplSubmissionSpin 1s linear infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: '#38bdf8',
              boxShadow:
                '0 0 18px rgba(56, 189, 248, 0.7)',
            }}
          />

        </div>


        {/* -------------------------------------------------
            TITLE
        ------------------------------------------------- */}

        <div
          id="submission-title"
          style={{
            textAlign: 'center',
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            marginBottom: '10px',
          }}
        >
          SUBMITTING REGISTRATION
        </div>


        {/* -------------------------------------------------
            CURRENT STATUS
        ------------------------------------------------- */}

        <div
          style={{
            textAlign: 'center',
            color: '#38bdf8',
            fontSize: '15px',
            lineHeight: 1.6,
            minHeight: '25px',
            marginBottom: '30px',
          }}
        >
          {submissionStage}
        </div>


        {/* -------------------------------------------------
            PROGRESS STEPS
        ------------------------------------------------- */}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >

          {/* STEP 1 */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >

            <div
              style={{
                width: '30px',
                height: '30px',
                minWidth: '30px',
                borderRadius: '50%',
                background:
                  'rgba(56, 189, 248, 0.15)',
                border:
                  '1px solid rgba(56, 189, 248, 0.4)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              ✓
            </div>

            <span
              style={{
                color: '#d7e0ea',
                fontSize: '14px',
              }}
            >
              Registration details saved
            </span>

          </div>


          {/* STEP 2 */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >

            <div
              style={{
                width: '30px',
                height: '30px',
                minWidth: '30px',
                borderRadius: '50%',
                background:
                  submissionStage?.toLowerCase().includes('upload')
                    ? 'rgba(56, 189, 248, 0.18)'
                    : 'rgba(255, 255, 255, 0.04)',
                border:
                  '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              2
            </div>

            <span
              style={{
                color: '#d7e0ea',
                fontSize: '14px',
              }}
            >
              Uploading photo & resume
            </span>

          </div>


          {/* STEP 3 */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >

            <div
              style={{
                width: '30px',
                height: '30px',
                minWidth: '30px',
                borderRadius: '50%',
                background:
                  submissionStage?.toLowerCase().includes('finaliz')
                    ? 'rgba(56, 189, 248, 0.18)'
                    : 'rgba(255, 255, 255, 0.04)',
                border:
                  '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              3
            </div>

            <span
              style={{
                color: '#d7e0ea',
                fontSize: '14px',
              }}
            >
              Finalizing registration
            </span>

          </div>

        </div>


        {/* -------------------------------------------------
            DO NOT CLOSE MESSAGE
        ------------------------------------------------- */}

        <div
          style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop:
              '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.48)',
            fontSize: '12px',
            lineHeight: 1.6,
          }}
        >
          Please wait while we securely submit your
          registration. Do not refresh or close this page.
        </div>

      </div>


      {/* ---------------------------------------------------
          SPINNER ANIMATION
      --------------------------------------------------- */}

      <style>
        {`
          @keyframes dplSubmissionSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

    </div>
  )


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="registration-form-shell">

      {/* =================================================
          SUBMISSION OVERLAY
      ================================================= */}

      {submissionOverlay}


      {/* =================================================
          PROGRESS
      ================================================= */}

      <div className="registration-progress">

        {stepLabels.map(
          (label, index) => {

            const number =
              index + 1


            return (
              <div
                key={label}
                className={`
                  registration-progress-step
                  ${step === number ? 'active' : ''}
                  ${step > number ? 'completed' : ''}
                `}
              >

                <span>
                  {step > number
                    ? '✓'
                    : `0${number}`}
                </span>

                <small>
                  {label}
                </small>

              </div>
            )
          }
        )}

      </div>


      {/* =================================================
          FORM CARD
      ================================================= */}

      <div className="registration-card">


        {/* =================================================
            STEP 1
        ================================================= */}

        {step === 1 && (

          <PersonalDetails
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />

        )}


        {/* =================================================
            STEP 2
        ================================================= */}

        {step === 2 && (

          <ResumeUpload
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />

        )}


        {/* =================================================
            STEP 3
        ================================================= */}

        {step === 3 && (

          <ProgrammingSkills
            formData={formData}
            updateForm={updateForm}
            errors={errors}
          />

        )}


        {/* =================================================
            STEP 4
        ================================================= */}

        {step === 4 && (

          <RegistrationReview
            formData={formData}
            databaseSkills={databaseSkills}
            onEditStep={setStep}
          />

        )}


        {/* =================================================
            SUBMIT ERROR
        ================================================= */}

        {submitError && (

          <div
            className="registration-submit-error"
            role="alert"
          >

            <strong>
              Registration failed
            </strong>

            <span>
              {submitError}
            </span>

          </div>

        )}


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div className="registration-actions">


          {/* -----------------------------------------------
              BACK
          ----------------------------------------------- */}

          {step > 1 && (

            <button
              type="button"
              className="registration-secondary-btn"
              onClick={previousStep}
              disabled={submitting}
            >
              ← BACK
            </button>

          )}


          <div className="registration-action-spacer" />


          {/* -----------------------------------------------
              CONTINUE
          ----------------------------------------------- */}

          {step < 4 && (

            <button
              type="button"
              className="registration-primary-btn"
              onClick={nextStep}
              disabled={submitting}
            >

              CONTINUE

              <span>
                →
              </span>

            </button>

          )}


          {/* -----------------------------------------------
              FINAL SUBMIT
          ----------------------------------------------- */}

          {step === 4 && (

            <button
              type="button"
              className="registration-primary-btn"
              onClick={submitRegistration}
              disabled={submitting}
            >

              {submitting
                ? 'SUBMITTING...'
                : 'SUBMIT REGISTRATION'
              }

              {!submitting && (

                <span>
                  →
                </span>

              )}

            </button>

          )}

        </div>

      </div>

    </div>
  )
}