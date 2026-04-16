const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors");
const UserModel = require("./models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

let app = express()


app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
})) 
app.use(cookieParser())

connectDB()




app.post("/register" , async (req,res)=>{
    try {
        // 1. Register user
        let {name,email , password , mobile} = req.body

        if(!name || !email || !password || !mobile){
            return res.json({
                message:"All fields are required"
            })
        }

        // 2.Hash Password

        let hashPass = await bcrypt.hash(password , 10);
        console.log(hashPass);

        // 3. Save data in db
        let users = await UserModel.create({
            name,
            email,
            password:hashPass,
            mobile
        })

        // 4. Generate JWT tokens

        let token = jwt.sign({id:users._id}, process.env.JWT_SECRET_KEY , {expiresIn:"1h"})

        // 5. Save token in cookies
        res.cookie("token" , token)

        // 6. Send response
        return res.json({
            message:"user registerd",
            users
        })


    } catch (error) {
        return res.json({
            message:"Internal server error in register",
            error
        })
    }
})


app.post("/login" , async (req,res)=>{
    try {
        // 1. Get data
        let {email , password} = req.body

        // Error Handle
        if(!email || !password){
            return res.json({
                message:"Email and Password is required"
            })
        }

        // 2. Check email existed 

        let isExisted = await UserModel.findOne({email})
        // console.log("Is Existed data ->",isExisted)

        if(!isExisted){
            return res.json({
                message:"This email not registered ! Registered first"
            })
        }

        // 3. Compare password 
        let hashPass = await bcrypt.compare(password ,isExisted.password)

        if(!hashPass){
            return res.json({
                message:"Invalid credentials"
            })
        }

        //4. Generate jwt token

        let token = await jwt.sign({id:isExisted._id} ,process.env.JWT_SECRET_KEY , {expiresIn:"1h"}  )

        // 5. Save to cookies

        res.cookie("token" , token)

        return res.json({
            message:"User logined successfully",
            users:isExisted
        })

    } catch (error) {
        return res.json({
            message:"Internal server error",
            error,
        }) 
    }
})







app.get("/users" , async (req,res)=>{
    try {
        let users = await UserModel.find();

       return res.json({
        message:"fetched user",
        users
       })
    } catch (error) {
        return res.json({
            message:"error in user fetched"
        })
    }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})