require("dotenv").config();
let express = require("express");
let cors = require("cors");
let cookieParser = require("cookie-parser");
let passport = require("passport");
let authRoutes = require("./routers/auth.route");
const UserModel = require("./model/user.model");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

let app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      let email = profile.emails[0].value;
      let name = profile.name.givenName;

      let isExisted = await UserModel.findOne({ email });

      if (isExisted) return cb(null, isExisted);

      let newUser = await UserModel.create({
        name,
        email,
        provider: profile.provider,
        provider_id: profile.id,
      });

      return cb(null, newUser);
    },
  ),
);

app.get("/", (req, res) => {
  res.send("tumse na ho paega");
});

app.use("/api/auth", authRoutes);

module.exports = app;
