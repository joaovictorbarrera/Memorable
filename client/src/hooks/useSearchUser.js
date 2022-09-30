import { useLayoutEffect, useState } from "react"

export default function useSearchUser(username) {
    const [user, setUser] = useState()

    async function search() {
        try {
            return await (await fetch(`http://localhost:4000/${username}`)).json()
        } catch (e) {
            return null
        }
    }
    
    useLayoutEffect(() => {
        setUser(undefined)
        search().then(setUser)
    }, [username])

    return user
}
