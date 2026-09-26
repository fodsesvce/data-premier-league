const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PHONE_REGEX = /^[6-9]\d{9}$/

/* =========================================================
   PERSONAL DETAILS
========================================================= */

export function validatePersonalDetails(formData) {
  const errors = {}

  // Full Name
  if (!formData.fullName?.trim()) {
    errors.fullName = 'Please enter your full name.'
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Name must contain at least 2 characters.'
  }

  // College Registration Number
  if (!formData.registrationNumber?.trim()) {
    errors.registrationNumber =
      'Please enter your college registration number.'
  }

  // Department
  if (!formData.department) {
    errors.department = 'Please select your department.'
  }

  // Year
  if (!formData.year) {
    errors.year = 'Please select your year.'
  }

  // College Email
  if (!formData.collegeEmail?.trim()) {
    errors.collegeEmail = 'Please enter your college email.'
  } else if (
    !EMAIL_REGEX.test(formData.collegeEmail.trim())
  ) {
    errors.collegeEmail = 'Please enter a valid email address.'
  }

  // Phone
  if (!formData.phone) {
    errors.phone = 'Please enter your phone number.'
  } else if (!PHONE_REGEX.test(formData.phone)) {
    errors.phone =
      'Enter a valid 10-digit Indian mobile number.'
  }

  return errors
}


/* =========================================================
   DOCUMENTS
========================================================= */

export function validateDocuments(formData) {
  const errors = {}

  // Resume
  if (!formData.resume) {
    errors.resume = 'Please upload your resume.'
  } else {
    if (formData.resume.type !== 'application/pdf') {
      errors.resume = 'Resume must be a PDF file.'
    }

    if (formData.resume.size > 5 * 1024 * 1024) {
      errors.resume = 'Resume must be smaller than 5 MB.'
    }
  }

  return errors
}


/* =========================================================
   PROGRAMMING SKILLS
========================================================= */

export function validateProgrammingSkills(formData) {
  const errors = {}

  // Most comfortable language
  if (!formData.comfortableLanguage) {
    errors.comfortableLanguage =
      'Please select your most comfortable programming language.'
  }

  // Proficiency
  if (!formData.proficiency) {
    errors.proficiency =
      'Please select your proficiency level.'
  }

  return errors
}