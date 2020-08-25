const mongoose = require("mongoose")
const express = require("express")
const passport = require("passport")
require('dotenv').config()

mongoose.connect(process.env.MONGOCLUSTER, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
()=> console.log("mongoose is connected"))




// =================== middleware =================================
const middleware = require("./middleware.js")
const app = express()
app.use(middleware)


require("./passportConfig")(passport)

// ================ end of middleware ==============================

// routes

const routes = require("./apiRoutes");
app.use(routes)


// start server
app.listen(4000,() =>  console.log("app is listening on 4000"))