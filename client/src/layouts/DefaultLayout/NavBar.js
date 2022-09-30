import React, { useCallback, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../../App.css"
import { useNavigate } from 'react-router-dom'
import useUser from "../../hooks/useUser"
import signUserOut from "../../services/signUserOut"

function NavBar() {
    const {user, refreshUser} = useUser()

    return (
        <nav className='navbar'>
            <div className='nav-wrapper'>
                <header>
                    <NavLink to="/" className="nav-link-no-style nav-link">
                        <h1>Memorable</h1>
                    </NavLink>
                </header>
                <SearchBox />
                <ul className='nav-links'>
                    <li>
                        {
                        user ? 
                        <ProfileIconWithDropdown user={user} refreshUser={refreshUser}/>  :
                        <NavLink to="/login" className="nav-link-no-style nav-link">Login</NavLink>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

function ProfileIconWithDropdown({user, refreshUser}) {
    const [open, setOpen] = useState(false)

    const signOut = useCallback(() => {
        signUserOut().then(refreshUser)
    }, [])

    return (
        <div id="nav-profile-icon">
            <div id="nav-profile-picture-wrapper">
                <img onClick={() => setOpen(state => !state)} alt={"User Profile"} src={user.pfp}/>
            </div>
            {
                open ?
                <ul id="nav-profile-dropdown">
                    <li><NavLink to={`/${user.username}`} className='nav-link-no-style nav-link'>Profile</NavLink></li>
                    <li><button id="sign-out-btn" className="nav-link" onClick={signOut}>Sign Out</button></li>
                </ul> :
                null
            }
        </div>
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

