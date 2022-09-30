import React, { useCallback, useLayoutEffect, useState } from 'react'
import "./Login.css"
import {Link, useNavigate} from "react-router-dom"
import LoginRegisterHeader from './components/LoginRegisterHeader'
import FormInput from './components/FormInput'

function Login() {

  const [error, setError] = useState(false)
  const errorMessage = error ? "Incorrect Username/Password" : null
  const navigate = useNavigate()

  useLayoutEffect(() => {
    fetch("http://localhost:4000/auth", {credentials: "include"})
    .then(res => res.json())
    .then(data => data.auth ? navigate("/") : null)
    .catch((e) => console.log(e))
  }, [])

  const handleLogin = useCallback((e) => {
    e.preventDefault()

    const form = e.target
    const loginURL = window.loginURL

    // Create new FormData object:
    const formData = new FormData(form);
    // Convert formData object to URL-encoded string:
    const payload = new URLSearchParams(formData);

    fetch(loginURL, {
      method:"POST",
      credentials: "include",
      body: payload,
    })
    .then(res => res.json())
    .then(data => {
      if (data.auth) {
        navigate("/")
      } else {
        setError(true)
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
      <form id="login-form" onSubmit={handleLogin}>
        <FormInput placeholder='Username' type="text" name="username" id="login-username" 
        errorMessage={errorMessage}/>

        <FormInput placeholder='Password' type="password" name="password" id="login-password"
        errorMessage={errorMessage}>
          <Link id="forgot-password">Forgot password?</Link>
        </FormInput>

        <button id="login-btn" type="submit">Login</button>
      </form>
      
      <footer id="login-needs-register">Need an account? <Link to="/register">Register</Link></footer>
    </>
  )
}

export default Login