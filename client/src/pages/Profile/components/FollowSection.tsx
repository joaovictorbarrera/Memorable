import { useState } from "react"
import User from "../../../interfaces/User"
import { useAuth } from "../../../contexts/AuthUserProvider"
import Modal from "../../../components/Modal"
import useFollowList from "../../../hooks/useFollowList"
import { useQuery } from "@tanstack/react-query"

interface FollowSectionProps {
  follawable: boolean,
  username: string
}

function FollowSection({follawable, username}: FollowSectionProps) {
    const URL_FOLLOWERS = `${import.meta.env.VITE_BASE_URL}/${username}/followers`

    const { data: followersData, refetch: refreshFollowers, isLoading: followersLoading} = useQuery(['followers', URL_FOLLOWERS], async () => {
        return await fetch(URL_FOLLOWERS,
        {credentials: "include"})
        .then(res => res.json())
    })

    const followers = followersData?.followers || []

    const URL_FOLLOWING = `${import.meta.env.VITE_BASE_URL}/${username}/following`

    const { data: followingData, isLoading: followingLoading } = useQuery(['following', URL_FOLLOWING], async () => {
        return await fetch(URL_FOLLOWING,
        {credentials: "include"})
        .then(res => res.json())
    })

    const following = followingData?.following || []

    const [followersModalOpen, setFollowersModalOpen] = useState<boolean>(false)
    const [followingModalOpen, setFollowingModalOpen] = useState<boolean>(false)

    if (followersLoading || followingLoading) return null

    return (
      <div className='profile-follow-info-wrapper'>
          {followersModalOpen && <FollowModal username={username} type={"followers"} setOpen={setFollowersModalOpen} />}

          <button type="button" className={followers.length > 0 ? 'clickable' : ""}
          onClick={() => {
            if (followers.length > 0) setFollowersModalOpen(true)
          }}>
            Followers: {followers.length}
          </button>

          {followingModalOpen && <FollowModal username={username} type={"following"} setOpen={setFollowingModalOpen}/>}

          <button type="button" className={following.length > 0 ? 'clickable' : ""}
          onClick={() => {
            if (following.length > 0) setFollowingModalOpen(true)
          }}>
            Following: {following.length}
          </button>

          {follawable && <FollowBtn followers={followers} refreshFollowers={refreshFollowers} username={username}/>}
      </div>
    )
}

interface FollowBtnProps {
  followers: string[],
  refreshFollowers: () => void,
  username: string
}

function FollowBtn({followers, refreshFollowers, username}: FollowBtnProps) {
  const { loggedUser: user } = useAuth()
  const follows = followers.includes(user?.username ?? "")

  function follow() {

    // TODO: USE MUTATION
    fetch(`${import.meta.env.VITE_BASE_URL}/${username}/follow`, {
      method: "POST",
      credentials: "include"
    })
    .then(refreshFollowers)
  }

  function unfollow() {
    if (window.confirm("Are you sure you want to stop following this user?")) {
      fetch(`${import.meta.env.VITE_BASE_URL}/${username}/follow`, {
        method: "DELETE",
        credentials: "include"
      })
      .then(refreshFollowers)
    }
  }

  return (
    <button
      type="button"
      className={`clickable follow-btn ${follows ? "following" : ""}`}
      onClick={follows ? unfollow : follow}>
      {follows ? "Following" : "Follow"}
    </button>
  )
}

interface FollowModalProps {
  username: string,
  type: "followers" | "following",
  setOpen: (x: boolean) => void
}

function FollowModal({username, type, setOpen}: FollowModalProps) {
  const { data, isLoading, isError } = useQuery(['follow-full', type, username], async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/${username}/${type}?fullData=true`
    return await (await fetch(url, {credentials: "include"})).json()
  })

  const followList: User[] = data?.[type] ?? []

  if (isLoading || isError) {
    return (
      <Modal setOpen={setOpen}>
      </Modal>
    )
  }

  return (
    <Modal setOpen={setOpen}>
      <ul className="follow-list">
        {followList.map(follow => (
          <li key={JSON.stringify(follow)}>
            <img src={follow.pfp}/>
            <span>{follow.firstName} {follow.lastName}</span>
          </li>
        ))}
      </ul>
    </Modal>
  )
}


  export default FollowSection
