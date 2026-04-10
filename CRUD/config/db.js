const { default: mongoose } = require("mongoose")

let connectDB = async ()=>{

    try {
        await mongoose.connect("mongodb://0.0.0.0/crud")
        console.log("Database connected")
    } catch (error) {
        console.log("Database not connected")
    }
}

module.exports = connectDB