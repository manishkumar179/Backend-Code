const mongoose = require("mongoose")

let connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connection  successfully")
    } catch (error) {
        console.log("Error in db connection");
    }
}

module.exports = connectDB