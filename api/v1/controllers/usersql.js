const mssql=require('mssql');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config={
    user:process.env.SQL_USER,
    password:process.env.SQL_PASS ,
    server:process.env.SQL_SERVER ,
    database:process.env.SQL_DB,
    port:parseInt(process.env.SQL_PORT),
    options:{trustServerCertificate: true}
};
// SQL_SERVER=localhost
// SQL_DB=WhatsUpLogate
// SQL_USER=waadmin
// SQL_PASS=123
// SQL_PORT=1433
// SQL_OPTIONS_TRUSTED=true
module.exports={ 
     Login:(req,res)=>{
       //  console.log(config);

        mssql.connect(config).
        then(function(conn){          
            const {Username,Pass}=req.body;
            const Sql=`SELECT * FROM T_Users WHERE username='${Username}'`;           
            conn.query(Sql).then(function(rows,error){
               if(error || rows.recordset.length!=1 )               
                        return res.status(409).json({Msg:"Username or Password Not Found",Err:error});
                const user=rows.recordset[0];
                bcrypt.compare(Pass,user.Pass).then((status)=>{
                        if(!status)
                            return res.status(409).json({Msg:"Username And / or Password Not Found"});

                      
                     //   const token=jwt.sign({Username:user.Username},process.env.SECRET_KEY,{expiresIn:'1H'});
                        const token=jwt.sign({Username,_id:user._id},process.env.SECRET_KEY,{expiresIn:'1H'});
                            return res.status(200).json({UID:user.UID,token:token});


                }); 
            
            }).catch(function(err){
                console.log(err);
                return res.status(500).json(err);
            });

        })
        .catch(function(err){
            console.log(err);
            return res.status(500).json(err);
        });
     },
     Register:(req,res)=>{
      console.log(config);
       mssql.connect(config).then(function(conn){
           
           const {Username,Pass,Fname,Lname,Address,City}=req.body; 
          // Check If User Already Exist
           const Sql=`select * from T_Users Where Username='${Username}'`;
           conn.query(Sql).then(function(rows){
            console.log("Check Exist");
               if(rows.recordset.length!=0)// If Exist- return 401 message
                    return res.status(401).json({Msg:"Cant Register User Already Exist"});
               
                bcrypt.hash(Pass,12).then((hashPass)=>{               
                    console.log("bcrypt");
                    const Sql=`insert into T_Users(Username,Pass,Fname) values('${Username}','${hashPass}','${Fname}')`; 
                    conn.query(Sql).then(function(rows,error){
                        if(error)
                            return res.status(500).json({Msg:`Error - Cant Register `,Err:error});
                        // Return Success Msg
                        return res.status(200).json(rows);
        
                        });
                        
                        }).catch(function(err){
                            console.log(err);
                            return res.status(500).json(err);
                        });
                });   
             // Create Hash for Password and then Register User       
        

           }).catch(function(err){
            console.log(err);
            return res.status(500).json(err);
        });
         

      
    }

};