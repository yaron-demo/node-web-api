const mongoose=require('mongoose');
mongoose.pluralize(null);
const UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    UserName:String,
    Pass:String
});
module.exports=mongoose.model('user',UserSchema);