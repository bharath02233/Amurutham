var mongoose=require('mongoose')
var schema=mongoose.Schema({
    name:String,
    phone:Number,
    doctor:Number,
    amount:Number,
    date:String,
    status:String
})

var model=mongoose.model("booking",schema);
module.exports=model;