const session = require("express-session")
const bodyParser = require("body-parser")
// const passportLocal = require("passport-local")
const passport = require("passport")

const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")


const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(session({
    secret: "thissecret",
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser("thissecret"))
app.use(passport.initialize())
app.use(passport.session());


module.exports = app;