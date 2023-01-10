import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

function useFollowList(username: string, type: "followers" | "following"): {data: string[], refetch: () => void, isLoading: boolean} {
    const URL = useMemo(() => `${import.meta.env.VITE_BASE_URL}/${username}/${type}`, [username, type])

    const { data, refetch, isLoading } = useQuery(['follow', URL], async () => {
        return await fetch(URL,
        {credentials: "include"})
        .then(res => res.json())
    })

    console.log(data)

    return {data: (data?.[type] || []), refetch, isLoading}
}

export default useFollowList
