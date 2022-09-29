const express = require("express")
const { users, createNewUser } = require("./services/createNewUser")
const app = express()
const port = process.env.PORT || 4000
app.use(
    require("cors")({
        origin:"*"
    })
)

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.post("/login", (req, res) => {
    const username = req?.body?.username + ""
    const password = req?.body?.password + ""

    const user = users.find(user => user.username === username)
    const auth = user?.password === password 

    if (auth) res.json({auth: true})
    else res.json({auth: false})
})

app.post("/register", (req, res) => {
    const user = {
        email: req?.body.email + "",
        username: req?.body.username + "",
        password: req?.body.password + "",
        "first-name": req?.body["first-name"] + "",
        "last-name": req?.body["last-name"] + ""
    }

    const result = createNewUser(user)
    if (result.success) {
        res.json({success: true})
    } else {
        res.json({success: false, errors: result.errors})
    }
})

app.listen(port, () => console.log("Server started"))