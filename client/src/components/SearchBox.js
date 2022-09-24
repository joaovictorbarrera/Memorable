import React from 'react'
import "../layouts/PageLayout.css"
import { useNavigate } from 'react-router-dom'

function SearchBox() {
    const navigate = useNavigate()

    function handleSearch(e) {
        e.preventDefault()
        const searchContent = e.target.querySelector("input").value
        if(searchContent) navigate(`/${searchContent}`)
    }

    return (
        <form onSubmit={handleSearch} id='search-box'>
            <input placeholder="Search..." type="text" name="search-content" id="search-box-input" />
            
        </form>

    )
}

export default SearchBox