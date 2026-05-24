let express = require("express");
const { registerController } = require("../controllers/auth.controller");

let router = express.Router()

router.post("/register" ,registerController );
module.exports = router