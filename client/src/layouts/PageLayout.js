import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import "./PageLayout.css"

function PageLayout() {
  return (
    <main>
        <NavBar />
        <div className='content'>
            <Outlet />
        </div>
    </main>

  )
}

export default PageLayout