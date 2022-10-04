const loginSch = require("../../schemas/loginSch")
const { checkPFP } = require("./checkPFP")

module.exports = {
    async updatePFP(username, url) {
        const checkPFPResult = await checkPFP(url)
        if (!checkPFPResult.success) return {success: false, error: checkPFPResult.error}

        try {
            await loginSch.updateOne({username}, {pfp: url})
            return {success: true}
        } catch(e) {
            console.log(e)
            return {success: false, error: "Internal server error"}
        }
    }
}