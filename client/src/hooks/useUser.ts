import { useCallback, useEffect, useState } from 'react'
import User from "../interfaces/User"

export interface LoggedUser {
    auth: boolean,
    user: User
}

function useUser() {
    const [user, setUser] = useState<LoggedUser["user"] | undefined | null>(undefined)
    const [updator, setUpdator] = useState({})

    function auth(): Promise<LoggedUser["user"] | null> {
        return fetch(process.env.REACT_APP_LOGGED_USER as string, {credentials: "include"})
        .then(res => res.json())
        .then((data: LoggedUser) => {
            if (!data.auth) return null
            return data.user
        })
        .catch(e => {
            console.log(e)
            return null
        })
    }
    
    useEffect(() => {
        setUser(undefined)
        auth().then((data) => {
            setUser(data)
        })
    }, [updator])

    const refreshUser = useCallback(() => setUpdator({}), [])

    return {user, refreshUser}
}

export default useUser