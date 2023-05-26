function validateDateInput (date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  return regex.test(date)
}

function mobileNumberValidator (mobileNumber) {
  const regex = /^[6789]\d{9}$/
  return regex.test(mobileNumber)
}

function validateNumberedString (value) {
  const regex = /^\d+$/
  return regex.test(value)
}

function validateNumericValues (value) {
  if (typeof value !== 'number') {
    return false
  }
  const regex = /^\d+(\.\d{1,2})?$/
  return regex.test(value.toString())
}

function passwordValidator (password) {
  const passwordRegex = /^(?=.*[A-Z|a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  return passwordRegex.test(password)
}
