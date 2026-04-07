import mongoose from "mongoose";

export let connectDB = async ()=>{

    try {
         await mongoose.connect("mongodb://0.0.0.0/fs34")
        console.log("Database connected successfully")
    } catch (error) {
        console.log("error in connecting database" , error)
    }
}


