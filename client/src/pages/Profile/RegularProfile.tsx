import React from 'react'
import User from "../../interfaces/User"

function RegularProfile({searchedUser}: {searchedUser: User}) {
    return (
    <div id='profile-page'>
      <section id='profile-items'>
        <div className='profile-picture'>
          <img 
          src={searchedUser.pfp}
          alt="This users profile"
          />
        </div>
        <div id='profile-name'>
            <h3 id='profile-username'>{`@${searchedUser.username}`}</h3>
            <span id='profile-full-name'>{`${searchedUser.firstName} ${searchedUser.lastName}`}</span>
          </div>
      </section>
      <section>
        
      </section>
    </div>
    )
  }

export default RegularProfile