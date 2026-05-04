
let express = require("express")
const connectDB = require("./config/db")
let authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
connectDB();

let app = express()

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth" , authRoutes);


module.exports  =  app