import React from "react"
import { NavLink } from "react-router-dom"

export default function LoginRegisterHeader() {

    function handleActive({isActive}) {
      return {
        ...(isActive ? {color:"white", fontSize: "2rem"} : {color: "grey"}),
        textDecoration: "none"}
    } 
  
    return (
      <header><h1 style={{color: "grey", fontSize: "1.5rem"}}>
        <NavLink to="/login" style={handleActive}>Login</NavLink>
        {" or "}
        <NavLink to="/register" style={handleActive}>Register</NavLink>
      </h1></header>
    )
  }