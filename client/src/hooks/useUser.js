import { useCallback, useEffect, useState } from 'react'

function useUser() {
    const [user, setUser] = useState(undefined)
    const [updator, setUpdator] = useState({})

    function auth() {
        return fetch(process.env.REACT_APP_LOGGED_USER, {credentials: "include"})
        .then(res => res.json())
        .then((data) => {
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