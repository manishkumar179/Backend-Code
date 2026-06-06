let express = require("express");
const { registerController, loginController, getAccessTokenController } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const ApiResponse = require("../utils/apiResponse");

let router = express.Router()

router.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json(new ApiResponse("loggedin user", req.user));
});

router.get("/get-accessToken", getAccessTokenController);
router.post("/register" ,registerController );
router.post("/login" , loginController)

module.exports = router