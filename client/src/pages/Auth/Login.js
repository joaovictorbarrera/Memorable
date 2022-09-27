import React from 'react'
import "./Login.css"
import {Link} from "react-router-dom"
import LoginRegisterHeader from './components/LoginRegisterHeader'

function Login() {
  return (
    <>
      <LoginRegisterHeader />
      <form id="login-form">
          <input className="login-input" placeholder='Username' type="text" name="username" id="login-username" />
          <input className="login-input" placeholder='Password' type="text" name="password" id="login-password" />
          <button id="login-btn" type="submit">Login</button>
      </form>
      
      <footer id="login-needs-register">Need an account? <Link to="/register">Register</Link></footer>
    </>
  )
}

export default Login