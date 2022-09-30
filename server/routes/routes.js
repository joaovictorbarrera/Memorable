const router = require("express").Router()
const { authorizeLogin } = require("../services/db/authorizeLogin")
const { createNewUser } = require("../services/db/createNewUser")
const { getUser } = require("../services/db/getUser")

router.delete("/signout", (req, res) => {
    try {
        req.session.auth = false
        req.session.username = undefined

        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }
})

router.get("/auth", (req, res) => {
    const isAuth = !!(req?.session?.auth)
    res.json({auth: isAuth})
})

router.get("/user", async (req, res) => {
    if (!req.session.auth) return res.sendStatus(401)
    const user = await getUser(req.session.username)
    if (!user) return res.sendStatus(404)
    return res.json({
        username: user.username,
        "first-name": user["first-name"],
        "last-name": user["last-name"],
        pfp: user.pfp
    })
})

router.post("/login", async (req, res) => {
    console.log("Is auth?", req.session.auth)
    console.log(req.session.id)
    if (req.session.auth) return

    const username = req?.body?.username + ""
    const password = req?.body?.password + ""

    const auth = await authorizeLogin(username, password)

    if (auth) {
        req.session.auth = true
        req.session.username = username
        res.status(200).json({auth: true})
    }
    else res.status(401).json({auth: false})
})

router.post("/register", async (req, res) => {
    const user = {
        email: req?.body.email + "",
        username: req?.body.username + "",
        password: req?.body.password + "",
        "first-name": req?.body["first-name"] + "",
        "last-name": req?.body["last-name"] + ""
    }

    const result = await createNewUser(user)
    if (result.success) {
        res.json({success: true})
    } else {
        res.json({success: false, errors: result.errors})
    }
})

router.get("/:user", async (req, res) => {
    const user = await getUser(req.params.user)
    if (!user) return res.sendStatus(404)
    return res.json({
        username: user.username,
        "first-name": user["first-name"],
        "last-name": user["last-name"],
        pfp: user.pfp
    })
})

module.exports = router