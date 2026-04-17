const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes");

const app = express();

connectDB();

app.use("/api/auth" ,authRoutes )

app.listen(3000 , ()=>{
    console.log("Server is running on port 3000")
})