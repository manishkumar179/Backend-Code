
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
  } catch (error) {}
};

module.exports = {
  registerService,
};