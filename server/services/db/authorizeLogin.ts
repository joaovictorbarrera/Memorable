import loginSch from "../../schemas/loginSch"
import { checkPassword } from "./passwordUtil"

export default async function authorizeLogin(username: string, password: string): Promise<boolean> {
    const userDoc = await loginSch.find({username})
    if (!userDoc || userDoc.length < 1) return false
    const user = userDoc[0]
    const auth = await checkPassword(user.password, password)

    return auth
}