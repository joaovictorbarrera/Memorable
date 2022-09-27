import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from './components/FormInput'
import LoginRegisterHeader from './components/LoginRegisterHeader'
import "./Register.css"

function Register() {
  const emailRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()

  const clientValidation = useCallback(() => {
    // TODO:
    const email = emailRef.current.value
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value
    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value
    
    return true
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    if (!clientValidation()) {
      window.alert("register failed")
      return
    }

    const form = e.target
    const registerURL = window.registerURL

    // Create new FormData object:
    const formData = new FormData(form);
    // Convert formData object to URL-encoded string:
    const payload = new URLSearchParams(formData);

    fetch(registerURL, {
      method:"POST",
      body: payload
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        navigate("/login")
      } else {
        // TODO:
        window.alert("register failed")
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
          <FormInput ref={emailRef} placeholder='E-mail Address' type="email" name="email" id="register-email"/>
          <FormInput ref={usernameRef} placeholder='Username' type="text" name="username" id="register-username" />
          <FormInput ref={passwordRef} placeholder='Password' type="password" name="password" id="register-password"/>
          <FormInput ref={confirmPasswordRef} placeholder='Confirm Password' type="password" name="confirm-password" id="register-confirm-password" />
          <FormInput ref={firstNameRef} placeholder='First Name' type="text" name="first-name" id="register-first-name"/>
          <FormInput ref={lastNameRef} placeholder='Last Name' type="text" name="last-name" id="register-last-name" />
          <button id="register-btn" type="submit">Create Account</button>
        </form>
      <footer id="already-have-an-account">Already own an account? <Link to="/Login">Login</Link></footer>
    </>
  )
}

export default Register