import { useCallback, useEffect, useState } from "react"

export default function useSearchUser(username) {
    const [searchedUser, setSearchedUser] = useState()
    const [updator, setUpdator] = useState({})
    const [auth, setAuth] = useState()

    function search() {
        return fetch(`http://localhost:4000/${username}`, {credentials: "include"})
        .then(res => res.json())
        .then(data => {
            if(!data.userExists) return null
            setAuth(data.auth)
            return data.user
        })
        .catch(e => {
            console.log(e)
            return null
        })
    }
    
    useEffect(() => {
        setSearchedUser(undefined)
        search().then(setSearchedUser)
    }, [username, updator])

    const refreshSearchedUser = useCallback(() => setUpdator({}))

    return {auth, searchedUser, refreshSearchedUser}
}
