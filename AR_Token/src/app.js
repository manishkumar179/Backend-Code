require("dotenv").config()
let express= require("express")
let authRoutes  = require("./routes/auth.routes")
let cookieParser = require("cookie-parser")

let app = express()
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth" , authRoutes)

module.exports = app