import React, { FormEvent, useRef, useState } from 'react'
import FormInput from '../../components/FormInput'
import Modal from '../../components/Modal'
import { useAuth } from '../../contexts/AuthUserProvider'
import User from "../../interfaces/User"
import FollowSection from './components/FollowSection'

function PersonalProfile({user}: {user: User}) {
    const [pfpModalOpen, setPfpModalOpen] = useState<boolean>(false)

    return (
      <>
      {pfpModalOpen ?
      <Modal setOpen={setPfpModalOpen}>
        <PersonalProfileModal setOpen={setPfpModalOpen} />
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

          <FollowSection follawable={false} username={user.username} />
        </section>
        <section>

        </section>
      </div>
      </>
    )
  }

function PersonalProfileModal({setOpen}: {setOpen: (x: boolean) => void}) {
    const { refreshLoggedUser } = useAuth()

    const imageURLRef = useRef<HTMLInputElement>()
    const [URL, setURL] = useState<string | undefined | null>()
    const [error, setError] = useState<string | undefined | null>()

    function handleImageError() {
      setURL(undefined)
      setError("Invalid Image")
    }

    function handlePreview() {
      if (!imageURLRef.current) return
      const url = imageURLRef.current.value
      const img = document.createElement("img")
      img.src = url

      img.onload = () => {
        setURL(url)
        setError(undefined)
        img.remove()
      }

      img.onerror = () => {
        setURL(undefined)
        setError("Invalid image")
        img.remove()
      }
    }

    function handleUpdatePFP(e: FormEvent) {
        e.preventDefault()
        const form = e.target

        // Create new FormData object:
        const formData = new FormData(form as HTMLFormElement);
        // Convert formData object to URL-encoded string:
        const payload = new URLSearchParams(formData as any);

        fetch(`${import.meta.env.VITE_BASE_URL}/pfp`, {
            credentials:"include",
            method:"PUT",
            body: payload
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
              refreshLoggedUser()
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

export default PersonalProfile
