
const UserModel = require("../model/user.model");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let registerControllers = async (req,res)=>{
    try {

        let {name , email , password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        let isExisted = await UserModel.findOne({email});
        if(isExisted){
            return res.status(409).json({
                message:"User already existed , Login now ! "
            })
        }

        let hashPass = await bcrypt.hash(password , 10);

        let newUser = await UserModel.create({
            name,
            email,
            password:hashPass
        })

        let token = jwt.sign({id:newUser._id} ,process.env.JWT_SECRET_KEY , {expiresIn:"1h"} )

        res.cookie("token" , token);

        return res.status(201).json({
            message:"User Registered Successfully",
            user:newUser
        })
        
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in register"
        })
    }
}



module.exports = {
    registerControllers,

}