require('dotenv').config();
const express=require('express');
const app=express();
const ProductRouter=require('./api/v1/routes/product');
const UserRouter=require('./api/v1/routes/user');
const cors=require('cors');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Auth=require('./api/v1/middlewares/Auth');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:false 
}))


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =process.env.MONGO_CONN_STR;
mongoose.connect(process.env.MONGO_CONN_STR,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
mongoose.connection.on('connected',()=>{

    console.log("Mongo DB Connected successfully");
});
// const client = new MongoClient(uri, );
// client.connect((err,result) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// client.on('connectionReady',()=>{

//     console.log("MongoConnected successfully");
// });


app.use("/product",Auth,ProductRouter);
app.use('/user',UserRouter);
app.all("*",(req,res)=>{
res.status(404).json({Msg:"404 Page not Found"});

});

module.exports=app;