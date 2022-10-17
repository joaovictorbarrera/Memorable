import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Profile.css"
import useSearchUser from '../../hooks/useSearchUser'
import RegularProfile from './RegularProfile'
import MyProfile from './MyProfile'
import { useLoggedUser } from '../../contexts/AuthUserProvider'

function Profile() {
  const { username: usernameParam } = useParams()
  const { searchedUser, refreshSearchedUser } = useSearchUser(usernameParam)
  const user = useLoggedUser()

  const loading = searchedUser === undefined
  const userNotFound = searchedUser === null

  const center = {
    display: "flex",
    justifyContent: "center"
  }

  // user logs out while on their own profile page
  useEffect(() => {
    if (searchedUser) refreshSearchedUser()
  }, [user])

  if (loading) {
    return <div></div>
  }

  if (userNotFound) {
    return <div style={center}>User not found</div>
  }

  if (user && user.username === searchedUser.username) {
    return (
      <MyProfile user={user} />
    )
  }
  
  return (
    <RegularProfile searchedUser={searchedUser} />
  )
}

export default Profile