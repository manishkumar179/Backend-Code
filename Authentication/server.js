require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleWare");
const cors = require("cors")

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use("/api/auth" ,authRoutes )

app.get("/me" ,authMiddleware, (req,res)=>{

   try {
    return res.status(200).json({
      success: true,
      message: "Logged in user",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }

})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})