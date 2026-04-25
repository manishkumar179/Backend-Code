const ProductModel = require("../model/product.model");

let productController = async (req,res)=>{
    try {
            let {productName , productTitle , description , currency , amount , category} = req.body;
    
        if(!productName || !productTitle || !description  || !currency || !amount ){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
    
        let product = await ProductModel.create({
            productName, productTitle, description , currency , amount, category
        })
    
        return res.status(200).json({
            message:"Data Saved",
            product
        })
    
        } catch (error) {
            return res.json({
                message:"Internal server error in product",
                error
            })
        } 
}

let getProductControllers = async (req,res)=>{
 try {

        let product = await ProductModel.find();

       return res.json({
        message:"fetched product",
        product
       })

    } catch (error) {
        return res.json({
            message:"error in user fetched"
        }) 
}
}

module.exports = {
    productController,
    getProductControllers
}