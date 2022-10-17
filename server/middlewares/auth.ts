import getUser from "../services/db/getUser"

export default async function auth(req:any, res:any, next:any) {
    if (!req.session.auth) {
        req.user = null
        return next()
    }
    req.user = await getUser(req.session.username)
    next()
}