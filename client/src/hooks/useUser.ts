import User from "../interfaces/User"
import { useQuery } from '@tanstack/react-query'

function useUser() {
    const { data: user, refetch } = useQuery(['auth'], async () => {
        return fetch(`${import.meta.env.VITE_BASE_URL}/loggedUser`, {credentials: "include"})
        .then(res => res.json())
        .then(data => {
            if (!data || !data?.auth) return null
            return data?.user as User
        })
    })

    return {user, refetch}
}

export default useUser
