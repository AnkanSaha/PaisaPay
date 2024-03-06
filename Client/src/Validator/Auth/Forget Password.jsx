import moment from 'moment'

export function StepOne (Data) {
  if (Data === '' || Data === null || Data === undefined) {
    alert('Please Enter a Valid Email')
    return false
  } else {
    return true // Return True
  }
} // Importing utc from moment

export function StepTwo (Data, UserData) {
  // User Entered Data
  const UserName = UserData.Name.toLowerCase()
  const UserEmail = UserData.Email.toLowerCase()

  // Data from Token
  const TokenName = Data.Name.toLowerCase()
  const TokenEmail = Data.Email.toLowerCase()
  const TokenDOB = moment.utc(Data.DOB).format('YYYY-MM-DD')

  if (
    UserName === TokenName &&
		UserEmail === TokenEmail &&
		UserData.DOB === TokenDOB &&
		Data.LastFourDigitsOfIDNumber === UserData.LastFourDigitsOfIDNumber &&
		Data.National_ID_Type === UserData.National_ID_Type
  ) {
    return true // Return True
  } else {
    return false // Return False
  }
}

export function StepThree (Data) {
  if (Data.Password === '' || Data.Password === null || Data.Password === undefined) {
    alert('Please Enter a Valid Password')
    return false
  } else if (Data.Password.length < 8) {
    alert('Password must be at least 8 characters long')
    return false
  } else if (Data.Password.length > 20) {
    alert('Password must be less than 20 characters long')
    return false
  } else if (Data.Password.search(/[a-z]/i) < 0) {
    alert('Password must contain at least one letter')
    return false
  } else if (Data.Password.search(/[0-9]/) < 0) {
    alert('Password must contain at least one digit')
    return false
  } else if (Data.Password.search(/[!@#$%^&*]/) < 0) {
    alert('Password must contain at least one special character')
  } else if (Data.Password !== Data.confirmPassword) {
    alert('Passwords do not match')
    return false
  } else {
    return true // Return True
  }
}
