const router = require("express").Router()

import authorizeLogin from "../services/db/authorizeLogin"
import createNewUser from "../services/db/createNewUser"
import getUser from "../services/db/getUser"
import auth from "../middlewares/auth"
import updatePFP from "../services/db/updatePFP"

router.put("/pfp", auth, async (req:any, res:any) => {
    if (!req.user ) return res.json({success:false, error:"You are not logged in"})
    if (!req?.body?.pfpURL) return res.json({success:false, error:"No URL received"})

    const updatePFPResult = await updatePFP(req.user.username, req.body.pfpURL)
    if (!updatePFPResult.success) return res.json({success:false, error: updatePFPResult.error})

    return res.json({success:true, error: null})
})

router.delete("/signout", (req:any, res:any) => {
    try {
        req.session.auth = false
        req.session.username = undefined

        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }
})

router.get("/auth", (req:any, res:any) => {
    const isAuth = !!(req?.session?.auth)
    res.json({auth: isAuth})
})

router.get("/loggedUser", async (req:any, res:any) => {
    if (!req.session.auth) return res.json({auth: false, user: null})
    const user = await getUser(req.session.username)
    if (!user) return res.json({auth: false, user: null})
    return res.json({
        auth: true,
        user: {
            username: user.username,
            "firstName": user.firstName,
            "lastName": user.lastName,
            pfp: user.pfp
        }
    })
})

router.post("/login", async (req:any, res:any) => {
    if (req.session.auth) return

    const username = req?.body?.username + ""
    const password = req?.body?.password + ""

    const auth = await authorizeLogin(username, password)

    if (auth) {
        req.session.auth = true
        req.session.username = username
        return res.status(200).json({auth: true})
    }
    
    return res.status(401).json({auth: false})
})

router.post("/register", async (req:any, res:any) => {
    const user = {
        email: req?.body.email + "",
        username: req?.body.username + "",
        password: req?.body.password + "",
        "firstName": req?.body.firstName + "",
        "lastName": req?.body.lastName + ""
    }

    const result = await createNewUser(user)
    if (result.success) {
        res.json({success: true, errors: null})
    } else {
        res.json({success: false, errors: result.errors})
    }
})

router.get("/:user", async (req:any, res:any) => {
    const user = await getUser(req.params.user)
    if (!user) return res.json({userExists: false, auth: false, user: null})

    const loggedUser = await getUser(req.session.username)
    const auth = loggedUser !== null && loggedUser.username === user.username

    return res.json({
        userExists: true,
        auth: auth,
        user: {
            username: user.username,
            "firstName": user.firstName,
            "lastName": user.lastName,
            pfp: user.pfp
        }
    })
})

export default router