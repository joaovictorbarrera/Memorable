import React, { useCallback, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../../components/FormInput'
import LoginRegisterHeader from './components/LoginRegisterHeader'
import { errorsReducer, ERRORS_INITIAL_STATE, ErrorReducerState } from './hooks/errorsReducer'
import "./Register.css"

function Register() {
  const navigate = useNavigate()

  const [errors, dispatchErrors] = useReducer(errorsReducer, ERRORS_INITIAL_STATE)

  const clientValidation = useCallback(function(formData: FormData) {
    const email = formData.get("email") as string
    const username = formData.get("username") as string
    
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const errors: ErrorReducerState = Object.assign(ERRORS_INITIAL_STATE)

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
    const validPasswordsAreEqual = password === confirmPassword

    if (!validPasswordsAreEqual) {
      errors.password = {
        errorMessage: "Passwords do not match."
      }

      errors["confirm-password"] = {
        errorMessage: "Passwords do not match."
      }
    }
    else if (!validPasswordLength) {
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
        errorMessage: "Invalid First Name."
      }
    }

    const validLastName = lastName.length >= 2
    
    if (!validLastName) {
      errors.lastName = {
        errorMessage: "Invalid Last Name."
      }
    }
    
    const success = !Object.values(errors).some(error => error.errorMessage != null)

    return {success, errors}
  }, [])

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault()

    const validation = clientValidation(new FormData(e.target))

    if (!validation.success) {
      dispatchErrors({type: "HANDLE_ERRORS", payload: validation.errors})
      return
    }

    dispatchErrors({type: "CLEAR"})
    const form = e.target

    // Create new FormData object:
    const formData = new FormData(form);
    const payload = new URLSearchParams(formData as any)

    // {success: true/false, errors: {empty | input-name: {errorMessage: ""}}}
    fetch(process.env.REACT_APP_REGISTER_POST as string, {
      method:"POST",
      body: payload
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        navigate("/login")
      } else {
        dispatchErrors({type: "HANDLE_ERRORS", payload: data.errors})
      }
    })
    .catch((e) => {
      console.log(e)
      window.alert("Error handling your request.")
    })
  }, [])

  return (
    <>
      <LoginRegisterHeader />
      <form id="register-form" onSubmit={handleSubmit}>
          <FormInput errorMessage={errors["email"].errorMessage} placeholder='E-mail Address' type="email" name="email" id="register-email"/>
          <FormInput errorMessage={errors["username"].errorMessage} placeholder='Username' type="text" name="username" id="register-username" />
          <FormInput errorMessage={errors["password"].errorMessage} placeholder='Password' type="password" name="password" id="register-password"/>
          <FormInput errorMessage={errors["confirm-password"].errorMessage} placeholder='Confirm Password' type="password" name="confirm-password" id="register-confirm-password" />
          <FormInput errorMessage={errors.firstName.errorMessage} placeholder='First Name' type="text" name="firstName" id="register-firstName"/>
          <FormInput errorMessage={errors.lastName.errorMessage} placeholder='Last Name' type="text" name="lastName" id="register-lastName" />
          <button id="register-btn" type="submit">Create Account</button>
        </form>
      <footer id="already-have-an-account">Already own an account? <Link to="/Login">Login</Link></footer>
    </>
  )
}

export default Register