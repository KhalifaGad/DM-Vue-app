export default {
  personalInfoValidation (fName, lName, phone, email) {
    let emailRegex = /\S+@\S+\.\S+/

    if (fName === '') {
      document.getElementById('fName').className =
                document.getElementById('fName').className + ' error-border'
      return false
    } else {
      document.getElementById('fName').className = document
        .getElementById('fName')
        .className.replace('error-border', ' ')
    }

    if (lName === '') {
      document.getElementById('lName').className =
                document.getElementById('lName').className + ' error-border'
      return false
    } else {
      document.getElementById('lName').className = document
        .getElementById('lName')
        .className.replace('error-border', ' ')
    }

    if (email === '' || !emailRegex.test(email)) {
      document.getElementById('email').className =
              document.getElementById('email').className + ' error-border'
      return false
    } else {
      document.getElementById('email').className = document
        .getElementById('email')
        .className.replace('error-border', ' ')
    }

    if (phone === '' || phone.length < 10) {
      document.getElementById('phone').className =
              document.getElementById('phone').className + ' error-border'
      return false
    } else {
      document.getElementById('phone').className = document
        .getElementById('phone')
        .className.replace('error-border', ' ')
    }

    return true
  }
}
