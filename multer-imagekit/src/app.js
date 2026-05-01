import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import upload from "./config/multer.js";
import sendtoImagekit from "./services/storage.service.js";

let app = express();

app.post("/getImage" ,upload.single("image"), async(req,res)=>{
    let data = req.file;

    if(!data){
        return res.status(404).json({
            message:"File not found"
        })
    }

    let uploadImage = await sendtoImagekit(data.buffer , data.originalname);
    console.log(uploadImage);

    return res.status(201).json({
        message:"Image Milgaya"
    })
})

export default app;