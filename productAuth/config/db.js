const mongoose = require("mongoose")

let connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://0.0.0.0/product")
        console.log("database connection  successfully")
    } catch (error) {
        console.log("Error in db connection")
    }
}

module.exports = connectDB