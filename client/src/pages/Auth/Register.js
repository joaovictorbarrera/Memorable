import React from 'react'
import { Link } from 'react-router-dom'
import LoginRegisterHeader from './components/LoginRegisterHeader'
import "./Register.css"

function Register() {
  return (
    <>
      <LoginRegisterHeader />
      <form id="register-form">
            <input className="register-input" 
            placeholder='E-mail Address' type="text" name="email" id="register-email" />
            <input className="register-input" 
            placeholder='Username' type="text" name="username" id="register-username" />
            <input className="register-input" 
            placeholder='Password' type="text" name="password" id="register-password" />
            <input className="register-input" 
            placeholder='Confirm Password' type="text" name="confirm-password" id="register-confirm-password" />
            <input className="register-input" 
            placeholder='First Name' type="text" name="first-name" id="register-first-name" />
            <input className="register-input" 
            placeholder='Last Name' type="text" name="last-name" id="register-last-name" />
            <button id="register-btn" type="submit">Create Account</button>
        </form>
      <footer id="already-have-an-account">Already own an account? <Link to="/Login">Login</Link></footer>
    </>
  )
}

export default Register