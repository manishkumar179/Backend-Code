require("dotenv").config()
const express = require("express");
const connectDB = require("./config/db");
const ProductModel = require("./model/product.model");
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

connectDB();

let app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/api/product" , productRoutes);
app.use("/api/auth" , authRoutes );


app.listen(3000 , ()=>{
    console.log("servre is running on port 3000")
})