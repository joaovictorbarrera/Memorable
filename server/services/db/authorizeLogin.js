const loginSch = require("../../schemas/loginSch")
const { checkPassword } = require("./passwordUtil")

module.exports = {
    async authorizeLogin(username, password) {
        const userDoc = await loginSch.find({username})
        if (!userDoc || userDoc.length < 1) return false
        const user = userDoc[0]
        const auth = await checkPassword(user.password, password)
        console.log({auth})

        return auth
    }
}