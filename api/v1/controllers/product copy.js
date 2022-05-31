module.exports={
    GetProduct:(req,res)=>{
        return  res.status(200).json({Msg:"All Peoducts"});
     },
    GetProductById:(req,res)=>{
        return res.status(200).json({Msg:"Get Product Details",
        pid:req.params.pid,
       });
    },
    UpdateProduct:(req,res)=>{
        return res.status(200).json({Msg:"Update Product",
        pid:req.params.pid,
        Body:req.body});
     },
    DeleteProduct:(req,res)=>{
        return res.status(200).json({Msg:"Product Deleted",
        pid:req.params.pid
        });
     },
    AddProduct:(req,res)=>{
        return res.status(200).json({Msg:"Add New Product",Body:req.body});
     }
}