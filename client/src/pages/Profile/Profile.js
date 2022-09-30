import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Profile.css"
import useSearchUser from '../../hooks/useSearchUser'

function Profile() {
  const [loading, setLoading] = useState(true)
  const { username } = useParams()
  const user = useSearchUser(username)

  const center = {
    display: "flex",
    justifyContent: "center"
  }

  useEffect(() => {
    setLoading(true)
  }, [username])

  useEffect(() => {
    if (user !== undefined) setLoading(false)
  }, [user])

  if (loading) {
    return <div style={center}>Loading...</div>
  }

  if (!user) {
    return <div style={center}>User not found</div>
  }
  
  return (
    <div id='profile-page'>
      <section id='profile-items'>
        <div id='profile-picture'>
          <img 
          src={user.pfp}
          alt="This users profile"
          />
        </div>
        <h3 id='profile-name'>{user.username}</h3>
      </section>
      <section>
        
      </section>
    </div>
  )
}

export default Profile