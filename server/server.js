const express = require("express")
const app = express()
const port = process.env.PORT || 4000
app.use(
    require("cors")({
        origin:"*"
    })
)

app.use(express.json())
app.use(express.urlencoded({extended:false}))


const users = [{username: "drag", password:"123"}, {username: "emily03", password:"123"}]
app.post("/login", (req, res) => {
    const username = req?.body?.username + ""
    const password = req?.body?.password + ""

    const user = users.find(user => user.username === username)
    const auth = user?.password === password 

    if (auth) res.json({auth: true})
    else res.json({auth: false})
})

app.post("/register", (req, res) => {
    const email = req?.body?.email + ""
    const username = req?.body?.username + ""
    const password = req?.body?.password + ""
    const firstName = req?.body?.firstName + ""
    const lastName = req?.body?.lastName + ""

    // TODO:
    const result = createNewUser({email, username, password, firstName, lastName})
    if (result.success) {
        res.json({success: true})
    } else {
        res.json({success: false, errors: result.errors})
    }
})

app.listen(port, () => console.log("Server started"))