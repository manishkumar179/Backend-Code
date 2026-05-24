
const asyncHandler = require("../utils/asyncHandler");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const ApiResponse = require("../utils/apiResponse");
const { registerService } = require("../services/auth.service");

let registerController = asyncHandler(async (req, res) => {
  let {accessToken, refreshToken, newUser} = await registerService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res
    .status(201)
    .json(new ApiResponse("user registered successfully", newUser));
});


module.exports = {
    registerController
}