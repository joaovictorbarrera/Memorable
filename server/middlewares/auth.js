const { getUser } = require("../services/db/getUser")

module.exports = {
    async auth(req, res, next) {
        if (!req.session.auth) {
            req.user = null
            return next()
        }
        req.user = await getUser(req.session.username)
        next()
    }
}