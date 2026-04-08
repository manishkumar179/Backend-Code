import express from 'express'
import { UserModel } from './models/user.model.js';
import { connectDB } from './config/db.js';

let app = express();
app.use(express.json())
connectDB()

app.post("/register" , async (req,res)=>{
    let {name,email,password,mobile} = req.body;
    
    if(!name || !email || !password || !mobile){
        return res.json({
            message:"All fields are required"
        })
    }

    let user = await UserModel.create({
        name,
        email,
        password,
        mobile
    })

    return res.json({
        message:"User Registered",
        user,
    })
})

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})