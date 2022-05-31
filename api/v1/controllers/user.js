const mongoose=require('mongoose');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const jwt=require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');


module.exports={

    Login:(req,res)=>{
        const {UserName,Pass}=req.body;
        User.find({UserName}).then((users)=>{
            if(users.length==0)
             return res.status(409).json({Msg:"Username Or Password are Wrong"});
             const curUser=users[0];
             console.log(curUser);
             bcrypt.compare(Pass,curUser.Pass).then((status)=>{
                if(!status)
                 return res.status(409).json({Msg:"Username Or Password are Wrong"});
                
                 const token=jwt.sign({UserName,_id:curUser._id},process.env.SECRET_KEY,{expiresIn:'1H'});
                 return res.status(200).json({Msg:"Username Logined Successfully",token});
             });
        });
        
    },
    Register:(req,res)=>{
        const {UserName,Pass}=req.body;
        bcrypt.hash(Pass,12,(err,hashPass)=>{
            if(err)
            return res.status(500).json({ServeError:err});
            const user=new User({
                _id:new mongoose.Types.ObjectId(),
                UserName,
                Pass:hashPass
            });
            user.save().then(()=>{
                return res.status(200).json(user)
    
            });

        });
       
    }
}