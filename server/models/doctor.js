var mongoose=require('mongoose')
var schema=mongoose.Schema({
    uid:Number,
    name:String,
    price:Number
})

var model=mongoose.model("doctors",schema);
module.exports=model;