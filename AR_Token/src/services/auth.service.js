let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt");

const ApiError = require("../utils/apiError");
const UserModel = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

let registerService = async (data) => {

  try {

    let { name, email, password } = data;

    if (!name || !email || !password)
      throw new ApiError(400, "all fields are required");

    let isExisted = await UserModel.findOne({ email });

    if (isExisted) throw new ApiError(409, "user already exist");

    let hashPass = bcrypt.hashSync(password, 10);

    let newUser = await UserModel.create({
      name,
      email,
      password: hashPass,
    });

    let accessToken = generateAccessToken(newUser._id);
    let refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return {
      accessToken,
      refreshToken,
      newUser,
    };
  } catch (error) {
    console.log("error in ra", error);
    throw new ApiError(500, "internal server error");
  }
};

let loginService = async(data)=>{
  try {

    let {email , password} = data;
    if(!email || !password){
      throw new ApiError(400 , "All fields are required")
    }

    let isExisted = await UserModel.findOne({email});

    if(!isExisted){
      throw new ApiError(404 , "user Not found")
    }

    let accessToken = generateAccessToken(isExisted._id);
    let refreshToken = generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return {
      accessToken,
      refreshToken,
      isExisted,
    };

  } catch (error) {
    throw new ApiError(500, "internal server error");
  }
}


let getAccessTokenService = async (refreshToken) => {
  
  if (!refreshToken) throw new ApiError(401, "unauthorized");

  let decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  let user = await UserModel.findById(decode.id);

  if (!user) throw new ApiError(404, "user not found");

  if (refreshToken !== user.refreshToken)
    throw new ApiError(401, "Unauthorized request");

  let accessToken = generateAccessToken(user._id);

  return accessToken;
};

module.exports = {
  registerService,
  loginService,
  getAccessTokenService
};