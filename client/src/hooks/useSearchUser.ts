import { useCallback, useEffect, useState } from "react"
import User from "../interfaces/User"

export default function useSearchUser(username: string | undefined) {
    const [searchedUser, setSearchedUser] = useState<SearchedUser["user"] | null | undefined>()
    const [updator, setUpdator] = useState({})
    const [auth, setAuth] = useState<boolean | null | undefined>()

    interface SearchedUser {
        userExists: boolean,
        auth: boolean,
        user: User
    }

    function search(): Promise<SearchedUser["user"] | null> {
        return fetch(`${process.env.REACT_APP_BASE_URL}/${username}`, {credentials: "include"})
        .then(res => res.json())
        .then((data:SearchedUser) => {
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

    const refreshSearchedUser = useCallback(() => setUpdator({}), [])

    return {auth, searchedUser, refreshSearchedUser}
}
