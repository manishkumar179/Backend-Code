const express = require("express")
const { productController, getProductControllers } = require("../controllers/product.controller")
let router = express.Router()

router.post("/create-product" , productController);
router.post("/" , getProductControllers);

module.exports = router;