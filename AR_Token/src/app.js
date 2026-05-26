require("dotenv").config()
let express= require("express")
let cors = require("cors")
let authRoutes  = require("./routes/auth.routes")
let cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error.middleware")
const authMiddleware = require("./middleware/auth.middleware")
const ApiResponse = require("./utils/apiResponse")

let app = express()
app.use(cors({
     origin:"http://localhost:5173",
     credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth" , authRoutes)


app.get("/home" ,authMiddleware,     (req,res)=>{

     return res.status(200).json(new ApiResponse("home fetched", "hello"));
})



app.use(errorMiddleware)

module.exports = app