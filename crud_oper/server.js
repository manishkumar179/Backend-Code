const express = require("express")
const connectDB = require("./config/db")
const UserModel = require("./models/user.model")

const app = express()
app.use(express.json())
connectDB()


//create 

app.post("/register" , async (req,res)=>{
    
    try {
        let {name,email,password} = req.body
        if(!name || !email || !password){
            return res.json({
                message:"All fields are required"
            })
        }

        let newUser = await UserModel.create({
            name,email,password
        });

        return res.json({
            message:"user registered",
            users:newUser
        })


    } catch (error) {
        console.log("Internal servor error in post")
    }

})

//read 
app.get("/users" , async(req,res)=>{
    try {

        let users = await UserModel.find();
        res.json({
            message:"user fetched",
            users
        })

    } catch (error) {
        return res.json({
            message:"Internal server error",
            error
        })
        
    }
})

//Dynamic Reading
app.get("/user/:id" ,async (req,res)=>{
    try {
        let {id} = req.params;
        if(!id){
            return res.json({
                message :"Id required"
            })
        }
        // let users = await UserModel.findById(id)
        let users = await UserModel.findOne({
            name:id
        })

        return res.json({
            message:"user fetched by dynamic",
            users
        })

    } catch (error) {
        return res.json({
            message:"Internal server error in dynamic routing",
            error
        })
    }
})

//update user

app.put("/user/update/:id" , async (req,res)=>{
    try {
        let {id} = req.params

        if(!id){
            return res.json({
                message:"id not found"
            })
        }

        let {name,email,password} = req.body
        if(!name || !email || !password){
            return res.json({
                message:"All fields are required"
            })
        }
        let userUpdate = await UserModel.findByIdAndUpdate(id,{
            name, email, password
        },
        {
            new:true,
        }
    )

    return res.json({
        message:'User updated',
        users: userUpdate
    })

    } catch (error) {
         return res.json({
            message:"Internal server error in update",
            error
        })
    }
})

//delete user

app.delete("/user/delete/:id" ,async (req,res)=>{
    try {
        let {id} = req.params
        if(!id){
            return res.json({
                message:"id not found , unauthorized user"
            })
        }
        await UserModel.findByIdAndDelete(id)
        return res.json({
            message:"user deleted"
        })
    } catch (error) {
        return res.json({
            message:"internal server error"
        })
    }
})
 

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
