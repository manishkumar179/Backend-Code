const express = require("express")
const { productController, getProductControllers } = require("../controllers/product.controller");
const authMiddleware = require("../middleware/auth.middleware.js");
const adminMiddleware = require("../middleware/admin.middleware.js");
const upload = require("../config/multer.js");


let router = express.Router()

router.post("/create-product" ,authMiddleware , adminMiddleware, productController);
router.get("/" , getProductControllers);


//get single image at a time
// router.post("/get-image" ,upload.single("image") , (req,res)=>{
//     let data = req.file;

//     console.log(data);

//     return res.send("image milgaya")
// })

// multiple file at a time

router.post("/get-image" ,upload.array("images" , 5) , (req,res)=>{
    let data = req.file;

    console.log(data);

    return res.send("image milgaya")
})

module.exports = router