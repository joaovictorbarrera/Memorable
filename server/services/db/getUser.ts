import loginSch from "../../schemas/loginSch"

export default async function getUser(username: string) {
    const userDoc = await loginSch.find({username})
    if (!userDoc || userDoc.length < 1) return null
    return userDoc[0]
}