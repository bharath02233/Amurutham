var express=require('express')
var mongoose=require('mongoose')
var bodyParser=require('body-parser')
var booking=require("./routes/bookingRoutes")
var cors=require('cors')
var docmod=require('./models/doctor')
mongoose.connect("mongodb+srv://bharath02233:Bharath-123@cluster0.ipbyk.mongodb.net/amruthan").then((ack)=>{console.log('sucess')}).catch((ack)=>{console.log(ack)})
var app=express()

app.use(cors());
app.use(bodyParser.json())
app.use("/book",booking);

app.get("/doctors",(req,res)=>{
     docmod.find({}).then((ack)=>{res.json(ack)});
})

app.listen(5000,()=>{console.log("server is running on port number 5000")});