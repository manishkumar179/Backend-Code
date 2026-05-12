let express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../config/multer");
const { createPostController, likeController, getAllPostController } = require("../controllers/post.controllers");

let router = express.Router()

router.post("/create" , authMiddleware , upload.array("images" , 5), createPostController);

router.get("/", getAllPostController);

router.get("/likes/:postId" , authMiddleware , likeController)

module.exports = router;