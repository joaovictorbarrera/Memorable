const loginSch = require("../../schemas/loginSch")

module.exports = {
    async getUser(username) {
        const userDoc = await loginSch.find({username})
        if (!userDoc || userDoc.length < 1) return null
        return userDoc[0]
    }
}