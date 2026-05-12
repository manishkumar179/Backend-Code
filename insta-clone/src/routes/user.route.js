let express = require("express");
const { followUnfollowController } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

let router = express.Router();

router.get('/follow/:followerId' ,authMiddleware,  followUnfollowController)

module.exports = router;