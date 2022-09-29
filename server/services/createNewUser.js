function validateNewUser(user) {
    const email = user.email
    const username = user.username
    const password = user.password
    const firstName = user["first-name"]
    const lastName = user["last-name"]
    const errors = {}

    // TODO: CHECK EMAIL LIBRARY
    const validEmail = new RegExp(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/).test(email) 
    if (!validEmail) {
      errors.email = {
        errorMessage: "Invalid Email Address."
      }
    }

    const validUsername = username.length >= 4
    if (!validUsername) {
      errors.username = {
        errorMessage: "Username must be at least 4 characters long."
      }
    }

    const validPasswordLength = password.length >= 8
    const validPasswordNumbers = new RegExp(/[0-9]/).test(password)
    const validPasswordCapital = new RegExp(/[A-Z]/).test(password)
    const validPasswordSpecial = new RegExp(/[!@#$%^&*()_+\-=\][{};':"\\|,.<>/?]/).test(password)

    if (!validPasswordLength) {
      errors.password = {
        errorMessage: "Password needs to be at least 8 characters long."
      }
    }
    else if (!validPasswordNumbers) {
      errors.password = {
        errorMessage: "Password needs to contain at least one number."
      }
    }
    else if (!validPasswordCapital) {
      errors.password = {
        errorMessage: "Password needs to contain at least one capital letter."
      }
    }
    else if (!validPasswordSpecial) {
      errors.password = {
        errorMessage: "Password needs to contain at least one special character."
      }
    }

    const validFirstName = firstName.length >= 2
    
    if (!validFirstName) {
      errors["first-name"] = {
        errorMessage: "Invalid First Name"
      }
    }

    const validLastName = lastName.length >= 2
    
    if (!validLastName) {
      errors["last-name"] = {
        errorMessage: "Invalid Last Name"
      }
    }

    return {success: Object.keys(errors).length === 0, errors: errors}
}

function registerNewUser(user) {}

// FIXME: when todo below is gone
const users = [{username: "drag", password:"123"}, {username: "emily03", password:"123"}]
const createNewUser = (user) => {
    const validationResult = validateNewUser(user)
    console.log(validationResult)
    if (!validationResult.success) return validationResult

    console.log(user)
    users.push(user)
    // TODO: implement db
    // const dbResult = registerNewUser(user)
    // if (!dbResult.success) return dbResult

    return {success: true}
}

module.exports = {users, createNewUser}