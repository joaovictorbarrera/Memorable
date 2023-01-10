import followSch from "../../schemas/followSch";
import { getCleanedUser, userExists } from "./getUser";

interface Response {
    success: boolean,
    error: string | null
}

export async function getFollowers(username: string, options?: { fullData?: boolean}) {
    const followers = await followSch.find({following: username})
    return (await Promise.all(followers.map(async follow => {
        if (options?.fullData) {
            return await getCleanedUser(follow.follower)
        }
        return follow.follower
    }))).filter(Boolean)
}

export async function getFollowing(username: string, options?: { fullData?: boolean}) {
    const following = await followSch.find({follower: username})

    return (await Promise.all(following.map(async follow => {
        if (options?.fullData) {
            return await getCleanedUser(follow.following)
        }
        return follow.following
    }))).filter(Boolean)
}

export async function follow(follower: string, following: string): Promise<Response> {
    if (follower === following) return {success: false, error: "You can't follow yourself"}
    if (!(await userExists(follower))) return {success: false, error: `${follower} is not a valid user`}
    if (!(await userExists(following))) return {success: false, error: `${following} is not a valid user`}

    if (!(await followSch.exists({follower, following}))) {
        await followSch.create({
            follower,
            following
        })
        return {success: true, error: null}
    }

    return {success: false, error: `${follower} already follows ${following}`}
}

export async function unfollow(follower: string, following: string): Promise<Response> {
    if (!(await userExists(follower))) return {success: false, error: `${follower} is not a valid user`}
    if (!(await userExists(following))) return {success: false, error: `${following} is not a valid user`}

    if (await followSch.exists({follower, following})) {
        await followSch.deleteMany({follower, following})
        return {success: true, error: null}
    }

    return {success: false, error: `${follower} does not follow ${following}`}
}
