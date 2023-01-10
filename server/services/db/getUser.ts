import loginSch from "../../schemas/loginSch"

export async function getUser(username: string) {
    const userDoc = await loginSch.find({username})
    if (!userDoc || userDoc.length < 1) return null
    return userDoc[0]
}

export async function getCleanedUser(username: string) {
    const user = await getUser(username)
    if (!user) return null
    return {
        username: user.username,
        "firstName": user.firstName,
        "lastName": user.lastName,
        pfp: user.pfp
    }
}

export async function userExists(username: string): Promise<boolean> {
    return (await loginSch.exists({username})) != null
}
