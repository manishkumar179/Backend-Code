const mongoose = require("mongoose")

let productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        currency:{
            type:String
        },
        amount:{
            type:Number
        }
    },
    category:{
        type:String,
        enum:["MENS", "WOMENS" , "KIDS"],
        default:"MENS"
    }
},{
    timestamps:true
})

let ProductModel = mongoose.model("product" , productSchema)

module.exports = ProductModel