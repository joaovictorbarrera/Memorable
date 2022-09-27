import React from 'react'
import { Outlet } from 'react-router-dom'
import "./AuthLayout.css"

function AuthLayout() {
  return (
    <div id='auth-page'>
        <div id='auth-card'>
            <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout