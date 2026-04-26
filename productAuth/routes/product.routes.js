const express = require("express")
const { productController, getProductControllers } = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware.js");
const adminMiddleware = require("../middleware/admin.middleware.js");
const upload = require("../config/multer.js");


let router = express.Router()

router.post("/create-product" ,authMiddleware , adminMiddleware, productController);
router.get("/" , getProductControllers);

router.post("/get-image" ,upload.single("image") , (req,res)=>{
    let data = req.file;

    console.log(data);

    return res.send("image milgaya")
})

module.exports = router