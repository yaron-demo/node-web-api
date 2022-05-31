const router=require('express').Router();
const {GetProduct,GetProductById,DeleteProduct,UpdateProduct,AddProduct}=require('../controllers/product');
router.get("/",GetProduct);
router.post("/",AddProduct);
router.get("/:pid",GetProductById);  
router.patch("/:pid",UpdateProduct);
router.delete("/:pid",DeleteProduct);
module.exports=router;