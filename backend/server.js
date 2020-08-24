const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const passport = require("passport")
const passportLocal = require("passport-local")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const bodyParser = require("body-parser")
const User = require("./user")

mongoose.connect("mongodb+srv://test:test@cluster0.c0cxe.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
()=> console.log("mongoose is connected"))

const app = express()

// middleware
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
require("./passportConfig")(passport)

// ================ end of middleware ==============================



















// routes
app.post("/login", (req, res, next) => {
    console.log("user login")
    console.log(req.body)



    passport.authenticate("local", (err, user, info) => {
        if (err) throw err
        if (!user) res.send("no user exists")
        else {
            req.logIn(user, err => {
                if (err) throw err
                res.send("successfully authenticated")
            })
        }
    })(req, res, next)
})

app.post("/register", (req, res) => {
    console.log("user register")
    console.log(req.body)
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("user already exists")
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            })
            await newUser.save()
            res.send("user created")
        }
    })
})

app.get("/user", (req, res) => {
    res.send(req.user)
})

// start server
app.listen(4000,() =>  console.log("app is listening on 4000"))