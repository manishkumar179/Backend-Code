const express = require("express");
const { registerControllers } = require("../controllers/auth.controllers");

let router = express.Router();

router.post("/register" , registerControllers);
// router.post("/login" , loginControllers);

module.exports = router;