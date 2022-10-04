import React, { useCallback, useReducer, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../../components/FormInput'
import LoginRegisterHeader from './components/LoginRegisterHeader'
import { errorsReducer, ERRORS_INITIAL_STATE } from './hooks/errorsReducer'
import "./Register.css"

function Register() {
  const navigate = useNavigate()

  const [errors, dispatchErrors] = useReducer(errorsReducer, ERRORS_INITIAL_STATE)

  const emailRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()

  const clientValidation = useCallback(() => {
    const email = emailRef.current.value || ""
    const username = usernameRef.current.value || ""
    const password = passwordRef.current.value || ""
    const confirmPassword = confirmPasswordRef.current.value || ""
    const firstName = firstNameRef.current.value || ""
    const lastName = lastNameRef.current.value || ""
    const errors = {}

    const validEmail = new RegExp(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/).test(email) 
    if (!validEmail) {
      errors[emailRef.current.name] = {
        errorMessage: "Invalid Email Address."
      }
    }

    const validUsername = username.length >= 4
    if (!validUsername) {
      errors[usernameRef.current.name] = {
        errorMessage: "Username must be at least 4 characters long."
      }
    }

    const validPasswordLength = password.length >= 8
    const validPasswordNumbers = new RegExp(/[0-9]/).test(password)
    const validPasswordCapital = new RegExp(/[A-Z]/).test(password)
    const validPasswordSpecial = new RegExp(/[!@#$%^&*()_+\-=\][{};':"\\|,.<>/?]/).test(password)
    const validPasswordsAreEqual = password === confirmPassword

    if (!validPasswordsAreEqual) {
      errors[passwordRef.current.name] = {
        errorMessage: "Passwords do not match."
      }

      errors[confirmPasswordRef.current.name] = {
        errorMessage: "Passwords do not match."
      }
    }
    else if (!validPasswordLength) {
      errors[passwordRef.current.name] = {
        errorMessage: "Password needs to be at least 8 characters long."
      }
    }
    else if (!validPasswordNumbers) {
      errors[passwordRef.current.name] = {
        errorMessage: "Password needs to contain at least one number."
      }
    }
    else if (!validPasswordCapital) {
      errors[passwordRef.current.name] = {
        errorMessage: "Password needs to contain at least one capital letter."
      }
    }
    else if (!validPasswordSpecial) {
      errors[passwordRef.current.name] = {
        errorMessage: "Password needs to contain at least one special character."
      }
    }

    const validFirstName = firstName.length >= 2
    
    if (!validFirstName) {
      errors[firstNameRef.current.name] = {
        errorMessage: "Invalid First Name."
      }
    }

    const validLastName = lastName.length >= 2
    
    if (!validLastName) {
      errors[lastNameRef.current.name] = {
        errorMessage: "Invalid Last Name."
      }
    }
    
    return {success: Object.keys(errors).length === 0, errors: errors}
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    const validation = clientValidation()

    if (!validation.success) {
      dispatchErrors({type: "HANDLE_ERRORS", payload: validation.errors})
      return
    }

    dispatchErrors({type: "CLEAR"})
    const form = e.target
    const registerURL = window.registerURL

    // Create new FormData object:
    const formData = new FormData(form);
    // Convert formData object to URL-encoded string:
    const payload = new URLSearchParams(formData);

    // {success: true/false, errors: {empty | input-name: {errorMessage: ""}}}
    fetch(registerURL, {
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
          <FormInput errorMessage={errors["email"].errorMessage} ref={emailRef} placeholder='E-mail Address' type="email" name="email" id="register-email"/>
          <FormInput errorMessage={errors["username"].errorMessage} ref={usernameRef} placeholder='Username' type="text" name="username" id="register-username" />
          <FormInput errorMessage={errors["password"].errorMessage} ref={passwordRef} placeholder='Password' type="password" name="password" id="register-password"/>
          <FormInput errorMessage={errors["confirm-password"].errorMessage} ref={confirmPasswordRef} placeholder='Confirm Password' type="password" name="confirm-password" id="register-confirm-password" />
          <FormInput errorMessage={errors.firstName.errorMessage} ref={firstNameRef} placeholder='First Name' type="text" name="firstName" id="register-firstName"/>
          <FormInput errorMessage={errors.lastName.errorMessage} ref={lastNameRef} placeholder='Last Name' type="text" name="lastName" id="register-lastName" />
          <button id="register-btn" type="submit">Create Account</button>
        </form>
      <footer id="already-have-an-account">Already own an account? <Link to="/Login">Login</Link></footer>
    </>
  )
}

export default Register