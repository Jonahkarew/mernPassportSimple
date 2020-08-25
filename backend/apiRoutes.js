const router = require("express").Router();
const passport = require("passport");
const User = require("./user");
const bcrypt = require("bcryptjs")



// login route
router.route("/login").post( (req, res, next) => {
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

// register route
router.route("/register").post( (req, res) => {
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

router.route("/user").get((req, res) => {
    res.send(req.user)
})




module.exports = router;