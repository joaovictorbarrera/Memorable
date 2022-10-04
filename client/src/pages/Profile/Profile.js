import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Profile.css"
import useSearchUser from '../../hooks/useSearchUser'
import RegularProfile from './RegularProfile'
import MyProfile from './MyProfile'
import { useLoggedUser } from '../../contexts/AuthUserProvider'

function Profile() {
  const [loading, setLoading] = useState(true)
  const { username: usernameParam } = useParams()
  const { searchedUser, refreshSearchedUser } = useSearchUser(usernameParam)
  const user = useLoggedUser()

  const center = {
    display: "flex",
    justifyContent: "center"
  }

  useEffect(() => {
    if (searchedUser) refreshSearchedUser()
  }, [user])

  useEffect(() => {
    setLoading(true)
  }, [usernameParam])

  useEffect(() => {
    if (searchedUser !== undefined) setLoading(false)
  }, [searchedUser])

  if (loading) {
    return <div></div>
  }

  if (!searchedUser) {
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