let express = require("express")
const { registerController, loginController, forgetPasswordController, resetPasswordController, updatePasswordController } = require("../controllers/auth.controllers")

let router = express.Router()

router.post("/register" ,registerController );
router.post("/login" , loginController)

router.post("/forget-password" ,forgetPasswordController  )
router.get("/reset-password/:token",resetPasswordController)

router.post("/update-password/:userId" , updatePasswordController)

module.exports = router