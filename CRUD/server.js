let express = require("express");
const connectDB = require("./config/db");
let cors = require("cors");
const UserModel = require("./models/user.model");
let app = express();
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173"
}))

connectDB();

app.post("/register", async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.json({
        message: "All fields are required",
      });
    }

    let newUser = await UserModel.create({
      name,
      email,
      password,
      mobile
    });

    return res.json({
      message: "user registered",
      user: newUser,
    }); 

  } catch (error) {
    console.log("Error in register -> " , error)
    return res.json({
      message: "internal server error ",
      error,
    });
  }
});

app.get("/users" , async (req,res)=>{
  try {
    let users = await UserModel.find()

    return  res.json({
      message:"data fetched",
      users
    })
  } catch (error) {
    return res.json({
      message:"server error in get"
    })
  }
})

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
