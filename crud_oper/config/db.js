let mongoose = require("mongoose")

let connectDB = async ()=>{

   try {
    await mongoose.connect('mongodb://0.0.0.0/first')
    console.log("Databse connected successfully")
   } catch (error) {
    console.log("Error in server connection")
   }
}

module.exports= connectDB