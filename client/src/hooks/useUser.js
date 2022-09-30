import { useCallback, useLayoutEffect, useState } from 'react'

function useUser() {
    const [user, setUser] = useState(null)
    const [updator, setUpdator] = useState({})

    async function auth() {
        try {
            return await (await fetch("http://localhost:4000/user", {credentials: "include"})).json()
        } catch (e) {
            return null
        }
    }
    
    useLayoutEffect(() => {
        setUser(undefined)
        auth().then(setUser)
    }, [updator])

    const refreshUser = useCallback(() => setUpdator({}), [])

    return {user, refreshUser}
}

export default useUser