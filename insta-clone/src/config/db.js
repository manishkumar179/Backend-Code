let mongoose = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error in Database connection", error);
  }
};

module.exports = connectDB