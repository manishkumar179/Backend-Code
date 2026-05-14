require("dotenv").config();
let express = require("express")
const connectDB = require("./config/db")
let authRoutes = require("./routes/auth.routes");
let postRoutes = require("./routes/post.routes");
let userRoutes = require("./routes/user.route")
const cookieParser = require("cookie-parser");
const path = require("path");
const sendMailTo = require("./services/mail.service");
const errorMiddleware = require("./middleware/error.middleware");
connectDB();

let app = express()

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth" , authRoutes);
app.use("/api/post" , postRoutes );
app.use("/api/user" , userRoutes)


// errorMiddleware--
app.use(errorMiddleware)
module.exports  =  app