const express = require("express");
const connectDB = require("./config/db");
const ProductModel = require("./model/product.model");

let app = express();
app.use(express.json());
connectDB();


app.post('/product' , async (req,res)=>{

    try {
        let {productName , productTitle , description , currency , amount , category} = req.body;

    if(!productName || !productTitle || !description  || !currency || !amount ){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    let product = await ProductModel.create({
        productName, productTitle, description , currency , amount, category
    })

    return res.status(200).json({
        message:"Data found",
        product
    })

    } catch (error) {
        return res.json({
            message:"Internal server error in product",
            error
        })
    } 
})

app.get("/getData" , async (req,res)=>{
    try {

        let product = await ProductModel.find();

       return res.json({
        message:"fetched product",
        product
       })
    } catch (error) {
        return res.json({
            message:"error in user fetched"
        })
    }
})

app.listen(3000 , ()=>{
    console.log("servre is running on port 3000")
})