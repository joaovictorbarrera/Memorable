const express = require("express")
const session = require("express-session")

async function runServer() {

// DB
console.log("waiting for database to connect...")
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1/memorable"
await require("./services/db/connectDB")(mongoURL)

const MongoStore = require("connect-mongo")
const sessionStore = new MongoStore({
    mongoUrl: mongoURL,
    collectionName: 'sessions'
})

const app = express()
const port = process.env.PORT || 4000

app.use(require("cors")({
    origin:"http://localhost:3000", 
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))
app.use(express.static("../client/build"))
app.use(require("./logger"))

// use forms
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// use session
if (!process.env.SECRET) console.log("\x1b[41m\x1b[37mWARNING! No secret found in environment variables! Your app may be at danger.\x1b[0m")
app.use(session({
    secret: process.env.SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // expires in 7 days
        httpOnly: true
    }
}))

// import routes
app.use("/", require("./routes/routes.js"))

app.listen(port, () => console.log("Server started"))
}

runServer()