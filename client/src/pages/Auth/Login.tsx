import React, { useCallback, useLayoutEffect, useState } from 'react'
import "./Login.css"
import {Link, useNavigate} from "react-router-dom"
import LoginRegisterHeader from './components/LoginRegisterHeader'
import FormInput from '../../components/FormInput'
import { useAuth } from '../../contexts/AuthUserProvider'

function Login() {
  const [error, setError] = useState(false)
  const errorMessage = error ? "Incorrect Username/Password" : null

  const navigate = useNavigate()
  const {loggedUser, refreshLoggedUser} = useAuth()

  useLayoutEffect(() => {
    if (loggedUser != null) navigate("/")
  }, [loggedUser])

  const handleLogin = useCallback((e: any) => {
    e.preventDefault()

    const form = e.target

    // Create new FormData object:
    const formData = new FormData(form);
    const payload = new URLSearchParams(formData as any)

    fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method:"POST",
      credentials: "include",
      body: payload,
    })
    .then(res => res.json())
    .then(data => {
      if (data.auth) {
        refreshLoggedUser()
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

  if (loggedUser === undefined) return (<div style={{backgroundColor: "var(--dark)"}}></div>)
  return (
    <>
      <LoginRegisterHeader />
      <form id="login-form" onSubmit={handleLogin}>
        <FormInput placeholder='Username' type="text" name="username" id="login-username"
        errorMessage={errorMessage}/>

        <FormInput placeholder='Password' type="password" name="password" id="login-password"
        errorMessage={errorMessage}>
          <Link to="#" id="forgot-password">Forgot password?</Link>
        </FormInput>

        <button id="login-btn" type="submit">Login</button>
      </form>

      <footer id="login-needs-register">Need an account? <Link to="/register">Register</Link></footer>
    </>
  )
}

export default Login
