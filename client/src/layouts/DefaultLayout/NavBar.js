import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../App.css"
import { useNavigate } from 'react-router-dom'

function NavBar() {
  return (
    <nav className='navbar'>
        <div className='nav-wrapper'>
            <header>
                <NavLink to="/" className="nav-link-no-style">
                    <h1>Memorable</h1>
                </NavLink>
            </header>
            <SearchBox />
            <ul className='nav-links'>
                <li><NavLink to="/" className="nav-link-no-style nav-link">Home</NavLink></li>
                <li><NavLink to="/login" className="nav-link-no-style nav-link">Login</NavLink></li>
            </ul>
        </div>
    </nav>
  )
}



function SearchBox() {
    const navigate = useNavigate()

    function handleSearch(e) {
        e.preventDefault()
        const searchContent = e.target.querySelector("input").value
        if(searchContent) navigate(`/${searchContent}`)
        else navigate("/")
    }

    return (
        <form onSubmit={handleSearch} id='search-box'>
            <input placeholder="Search..." type="text" name="search-content" id="search-box-input" />
            
        </form>

    )
}

export default NavBar

