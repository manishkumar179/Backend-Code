import mongoose from "mongoose";

let userScheme = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number
},
{
    timestamps:true
}
)

export let UserModel = mongoose.model("user" , userScheme);