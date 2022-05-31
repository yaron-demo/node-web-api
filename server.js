const http=require('http');
const app=require('./app');
const svr=http.createServer(app);
const port=3000;
svr.listen(port,()=>{console.log("server started lo listen")});