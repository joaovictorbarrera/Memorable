const express = require("express")
const https = require("https")
const fs = require("fs")

import session from "express-session"
import connectDB from "./services/db/connectDB"
import cors from "cors"
import logger from "./logger"
import routes from "./routes/routes"

async function runServer() {

// DB
console.log("waiting for database to connect...")
const mongoURL = process.env.MONGO_URL as string || "mongodb://127.0.0.1/memorable"
await connectDB(mongoURL)

const MongoStore = require("connect-mongo")
const sessionStore = new MongoStore({
    mongoUrl: mongoURL,
    collectionName: 'sessions'
})

const options = {
    key: fs.readFileSync("./config/key.pem"),
    cert: fs.readFileSync("./config/cert.pem"),
}

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
    origin:"http://127.0.0.1:5173",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))
app.use(express.static("../client/build"))
app.use(logger)

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
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }
}))

// import routes
app.use("/", routes)

https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS server started on port ${PORT}`);
});

}

runServer()
