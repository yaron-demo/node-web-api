const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>
{
const authHeader=req.headers.authorization;
console.log(authHeader);
try{
    const token=authHeader.split(' ')[1];
    console.log(token);
  const obj=jwt.verify(token,process.env.SECRET_KEY);
  req.userObj=obj;
    next();
}
catch(e){
    console.log(`Un authorized access attemp ${e}`);
    return res.status(401).json({Msg:"Un authorized access attemp"});
    
}

  


};