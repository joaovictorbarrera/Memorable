import { useLayoutEffect, useState } from 'react'
import queryUser from "../services/queryUser"

function useUser(username) {
    const [user, setUser] = useState()
    
    useLayoutEffect(() => {
        setUser(queryUser(username))
    }, [username])

    return user
}

export default useUser