import dotenv from "dotenv";
dotenv.config();

let port = process.env.PORT
import app from "./src/app.js";

app.listen(port , ()=>{
    console.log(`Server is running on ${port}`)
})