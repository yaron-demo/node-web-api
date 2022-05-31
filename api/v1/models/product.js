const mongoose=require('mongoose');
mongoose.pluralize(null);
const ProductSchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
Pid:Number,
Price:Number,
Pname:String
});

module.exports=mongoose.model("products",ProductSchema);