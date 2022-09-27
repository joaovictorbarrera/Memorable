import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import "./DefaultLayout.css"

function DefaultLayout() {
  return (
    <main>
        <NavBar />
        <div className='content'>
            <Outlet />
        </div>
    </main>

  )
}

export default DefaultLayout