import React from 'react'
import { useParams } from 'react-router-dom'
import "./Profile.css"
import useUser from '../../hooks/useUser'

function Profile() {
  const { username } = useParams()
  const user = useUser(username)

  if (!user) {
    return <div>User not found</div>
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