import React, { useRef, useState } from 'react'
import FormInput from '../../components/FormInput'
import Modal from '../../components/Modal'
import { useRefreshLoggedUserStatus } from '../../contexts/AuthUserProvider'

function MyProfile({user}) {
    const [pfpModalOpen, setPfpModalOpen] = useState(false)
  
    return (
      <>
      {pfpModalOpen ? 
      <Modal setOpen={setPfpModalOpen}>
        <MyProfileModal setOpen={setPfpModalOpen} />
      </Modal> 
      : null}
      <div id='profile-page'>
        <section id='profile-items'>
          <div id="click-to-change-pfp" className='profile-picture' onClick={() => setPfpModalOpen(true)}>
            <img 
            src={user.pfp}
            alt="This users profile"
            />
          </div>
          <div id='profile-name'>
            <h3 id='profile-username'>{`@${user.username}`}</h3>
            <span id='profile-full-name'>{`${user.firstName} ${user.lastName}`}</span>
          </div>
        </section>
        <section>
          
        </section>
      </div>
      </>
    )
  }

function MyProfileModal({setOpen}) {
    const refreshLoggedUserStatus = useRefreshLoggedUserStatus()
    const imageURLRef = useRef()
    const [URL, setURL] = useState()
    const [error, setError] = useState()

    function handleImageError() {
      setURL(undefined)
      setError("Invalid Image")
    }

    function handlePreview() {
      const url = imageURLRef.current.value
      const img = document.createElement("img")
      img.src = url

      img.onload = () => {
        setURL(url)
        setError(undefined)
        img.onload = undefined
        img.onerror = undefined
        img.remove()
      }

      img.onerror = () => {
        setURL(undefined)
        setError("Invalid image")
        img.onload = undefined
        img.onerror = undefined
        img.remove()
      }
    }

    function handleUpdatePFP(e) {
        e.preventDefault()
        const form = e.target
    
        // Create new FormData object:
        const formData = new FormData(form);
        // Convert formData object to URL-encoded string:
        const payload = new URLSearchParams(formData);

        fetch(process.env.REACT_APP_CHANGE_PROFILE_PICTURE, {
            credentials:"include",
            method:"PUT",
            body: payload
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
              refreshLoggedUserStatus()
              setOpen(false)
              return
          }
            
          setError(data.error)
        })
        .catch(e => {
          setError("Unexpected Error.")
        })
    }

    return (
    <div id="updatePFP-modal-container">
      <header id="updatePFP-header">
          <h1>Change Your Profile Picture:</h1>
      </header>

      {URL ? 
      <section id="updatePFP-image-preview-container">
        <h3>Profile picture preview: </h3>
        <section id="updatePFP-image-wrapper">
          <img alt="preview" src={URL} onError={handleImageError}/>
        </section>
      </section> :
      null}

      <section>
          <form onSubmit={handleUpdatePFP} id="updatePFP-wrapper">
              <label htmlFor="pfpURL">Enter the image URL: </label>
              <FormInput ref={imageURLRef} placeholder='Image URL' name="pfpURL" type="text" errorMessage={error} id="pfpURL"/>
              <div id='updatePFP-buttons-wrapper'>
                <button type="submit" className="secondary-btn">Submit</button>
                <button type="button" onClick={handlePreview} className="secondary-btn">Preview</button>
              </div>
          </form>
      </section>
    </div>
    )
}

export default MyProfile