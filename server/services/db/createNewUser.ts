import loginSch from "../../schemas/loginSch"
import { encryptPassword } from "./passwordUtil"

interface NewUser {
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string
}

interface ResponseWithErrors {
  success: boolean,
  errors: {[index: string]: {errorMessage:string | null | undefined} | null | undefined}
}

async function validateNewUser(user: NewUser): Promise<ResponseWithErrors> {
    const email = user.email
    const username = user.username
    const password = user.password
    const firstName = user.firstName
    const lastName = user.lastName

    const errors: {[index: string]: {
      errorMessage:string | null | undefined
    }} = {}

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
      errors.firstName = {
        errorMessage: "Invalid First Name"
      }
    }

    const validLastName = lastName.length >= 2
    
    if (!validLastName) {
      errors.lastName = {
        errorMessage: "Invalid Last Name"
      }
    }

    return {success: Object.keys(errors).length === 0, errors: errors}
}

async function registerNewUser(user: NewUser): Promise<ResponseWithErrors> {
  try {
    await loginSch.create(user)
    return {success: true, errors: null}
  } catch (e) {
    console.log(e)
    return {success: false, errors: {"all": {errorMessage: "Unexpected Error"}}}
  }
}

async function checkUserAlreadyExists(user: NewUser): Promise<ResponseWithErrors> {
  const errors: {[index: string]: {
    errorMessage:string | null | undefined
  }} = {}

  // check username already exists
  const usernameDoc = await loginSch.find({username: user.username})
  const validUsername = usernameDoc.length < 1
  if (!validUsername) {
    errors["username"] = {
      errorMessage: "Username already exists."
    }
  }

  // check email already exists
  const emailDoc = await loginSch.find({email: user.email})
  const validEmail = emailDoc.length < 1
  if (!validEmail) {
    errors["email"] = {
      errorMessage: "Email already exists."
    }
  }

  return {success: validUsername && validEmail, errors}
}

export default async function createNewUser(user: NewUser): Promise<ResponseWithErrors> {
  console.log("Checking if new user already exists...")
  // check already exists
  const alreadyExistsResult = await checkUserAlreadyExists(user)
  if (!alreadyExistsResult.success) {
    console.log("User already exists.")
    return alreadyExistsResult
  }

  // validation
  console.log("Validating new user...")
  const validationResult = await validateNewUser(user)
  if (!validationResult.success) {
    console.log("New user is invalid.")
    return validationResult
  }

  // encrypt password
  console.log({"password": user.password})
  user.password = await encryptPassword(user.password)

  // register on db
  console.log("Registering new user...")
  const dbResult = await registerNewUser(user)
  if (!dbResult.success) {
    console.log("Failed to register new user.")
    return dbResult
  }

  console.log("Successfully created new user.")
  return {success: true, errors: null}
}