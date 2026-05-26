
const asyncHandler = require("../utils/asyncHandler");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
const ApiResponse = require("../utils/apiResponse");
const { registerService, loginService, getAccessTokenService } = require("../services/auth.service");

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

let loginController = asyncHandler(async(req,res)=>{

  let { accessToken, refreshToken, isExisted } = await loginService(req.body);

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
    .json(new ApiResponse("user registered successfully", isExisted));


})


let getAccessTokenController = asyncHandler(async (req, res) => {
  
  let refreshToken = req.cookies.refreshToken;

  let accessToken = await getAccessTokenService(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 15 * 60 * 1000,
  });

  return res.status(200).json(new ApiResponse("access token generated"));
});



module.exports = {
    registerController,
    loginController,
    getAccessTokenController
}