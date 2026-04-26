const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
},{
    timestamps:true
});

let UserModel = mongoose.model("user",userSchema);

module.exports = UserModel;