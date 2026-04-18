require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleWare");

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth" ,authRoutes )

app.get("/home" ,authMiddleware, (req,res)=>{

    res.send(req.users);
    // res.send("hello from middle")

})

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})