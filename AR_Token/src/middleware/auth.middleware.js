const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiError");


let authMiddleware = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;

    if (!accessToken)
      return res.status(401).json({
        message: "Unauthorized request",
      });

    let decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decode)
      return res.status(401).json({
        message: "Unauthorized",
      });

    let user = await UserModel.findById(decode.id);

    req.user = user;
    next();
  } catch (error) {
    console.log("error in middleware", error);
    throw new ApiError(500, error);
  }
};

module.exports = authMiddleware;