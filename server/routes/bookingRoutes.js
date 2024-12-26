var mod=require('../models/booking')
var express=require('express')

var app=express.Router()

app.get("/phone/:phonenumb",(req,res)=>{
    var x=+(req.params.phonenumb);
    mod.find({phone:x}).then((res1)=>{
        console.log(res1);
        if(res1.length>0)
        {
            res.json({status:false})  
        }
        else
        {
         res.json({status:true})
        }
    }).catch((res1)=>{
        console.log(res1,"errororor");
    })
    
})
app.post("/bokkings",(req,res)=>{
    var newdoc=new mod(req.body);
    
    newdoc.save().then((res1)=>{console.log(res1)}).catch((res1)=>{console.log(res1)})
})

app.get("/bokkings",(req,res)=>{
    mod.find({}).then((res1)=>{
        res.json(res1)
    }).catch((res1)=>{res.json(res1)})
})
module.exports=app;
