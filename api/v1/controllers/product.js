const product=require('../models/product');
const mongoose=require('mongoose');


module.exports={
    GetProduct:(req,res)=>{// הצגת כל המוצרים
      product.find().then((prod)=>{
        console.log(req.userObj)
        return  res.status(200).json(prod);
      });
       
     },
    GetProductById:(req,res)=>{
        // הצגת מוצר לפי קוד מוצר
        product.findOne({Pid:req.params.pid}).then((prod)=>{
          return  res.status(200).json(prod);
        });
       
    },
    UpdateProduct:(req,res)=>{
        // עדכון מוצר
        product.updateOne({Pid:req.params.pid},req.body).then((prod)=>{
            return res.status(200).json(prod);
            
        });
        
     },
    DeleteProduct:(req,res)=>{
        //מחיקת מוצר
        product.deleteOne({Pid:req.params.pid}).then((prod)=>{
            return res.status(200).json({Msg:"Product Deleted",
            pid:req.params.pid
            });
        });
        
     },
    AddProduct:(req,res)=>{
        // הוספת מוצר חדש
        const{Pid,Pname,Picname,Price}=req.body;
        const Prod=new product({
            _id:new mongoose.Types.ObjectId()   ,
            Pid:Pid,
            Pname:Pname,
            Price:Price,
            Picname:Picname
        });
        Prod.save().then(()=>{

          return  res.status(200).json({msg:'Product Details by Id '+Pid });
        })
       
     }
}