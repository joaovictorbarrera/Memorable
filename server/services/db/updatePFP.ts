import DefaultResponse from "../../interfaces/DefaultResponse"
import loginSch from "../../schemas/loginSch"
import checkPFP from "./checkPFP"

export default async function updatePFP(username: string, url: string): Promise<DefaultResponse> {
    const checkPFPResult = await checkPFP(url)
    if (!checkPFPResult.success) return {success: false, error: checkPFPResult.error}

    try {
        await loginSch.updateOne({username}, {pfp: url})
        return {success: true, error: null}
    } catch(e) {
        console.log(e)
        return {success: false, error: "Internal server error"}
    }
}