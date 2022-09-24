import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBox from './SearchBox'

function NavBar() {
  return (
    <nav className='navbar'>
        <div className='nav-wrapper'>
            <header>
                <NavLink to="/" className="nav-link-no-style"><h1>Memorable</h1></NavLink>
            </header>
            <SearchBox />
            <ul className='nav-links'>
                <li><NavLink to="/" className="nav-link-no-style nav-link">Home</NavLink></li>
                <li><NavLink to="/drag" className="nav-link-no-style nav-link">Drag</NavLink></li>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar