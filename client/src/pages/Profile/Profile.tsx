import { useParams } from 'react-router-dom'
import "./Profile.css"
import RegularProfile from './RegularProfile'
import PersonalProfile from './PersonalProfile'
import { useAuth } from '../../contexts/AuthUserProvider'
import User, { SearchedUser } from '../../interfaces/User'
import { useQuery } from '@tanstack/react-query'

function Profile() {
  const { username: usernameParam } = useParams()
  const { loggedUser: user } = useAuth()

  const URL = `${import.meta.env.VITE_BASE_URL}/profile/${usernameParam}`
  const { data: searchedUserData, isLoading: searchedUserLoading } = useQuery(['searched-user', usernameParam, user],
  async (): Promise<SearchedUser> => {
      const res =  await fetch(URL, {credentials: "include"})
      return await res.json()
  })

  const searchedUser = searchedUserData?.userExists ? searchedUserData?.user : null
  const auth = searchedUserData?.auth

  if (searchedUserLoading) {
    return <div></div>
  }

  if (searchedUser == null) {
    return <div style={{display: "flex", justifyContent: "center" }}>User not found</div>
  }

  if (auth) {
    return (
      <PersonalProfile user={searchedUser} />
    )
  }

  return (
    <RegularProfile searchedUser={searchedUser} loggedIn={!!user} />
  )
}

export default Profile
