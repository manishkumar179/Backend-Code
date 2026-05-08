let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../config/multer");
const { createPostController } = require("../controllers/post.controllers");

let router = express.Router()

router.post("/create" , authMiddleware ,upload.array("images" , 5), createPostController);


module.exports = router