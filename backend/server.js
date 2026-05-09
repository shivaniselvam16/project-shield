const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const SECRET = process.env.JWT_SECRET || "shield_secret_key";

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* Logs */
let logs = [
 {id:1,message:"Failed Login Attempts",level:"high",source:"Firewall"},
 {id:2,message:"Normal User Login",level:"low",source:"Auth"},
 {id:3,message:"Port Scan Detected",level:"high",source:"IDS"}
];

let id = 4;

/* Home */
app.get("/",(req,res)=>{
 res.send("Project Shield Running");
});

/* Register */
app.post("/register", async(req,res)=>{
 try{
   const {username,password} = req.body;

   const existing = await User.findOne({username});

   if(existing){
     return res.json({
       status:"failed",
       message:"User exists"
     });
   }

   const hash = await bcrypt.hash(password,10);

   await User.create({
     username,
     password:hash
   });

   res.json({
     status:"success",
     message:"Registered"
   });

 }catch(err){
   res.json({
     status:"failed",
     message:err.message
   });
 }
});

/* Login */
app.post("/login", async(req,res)=>{
 try{
   const {username,password} = req.body;

   const user = await User.findOne({username});

   if(!user){
     return res.json({
       status:"failed",
       message:"User not found"
     });
   }

   const match = await bcrypt.compare(password,user.password);

   if(!match){
     return res.json({
       status:"failed",
       message:"Wrong password"
     });
   }

   const token = jwt.sign({username},SECRET,{expiresIn:"1h"});

   res.json({
     status:"success",
     token,
     username
   });

 }catch(err){
   res.json({
     status:"failed",
     message:err.message
   });
 }
});

/* Logs */
app.get("/logs",(req,res)=>{
 res.json(logs);
});

app.post("/logs",(req,res)=>{
 const {message,level,source} = req.body;

 const newLog = {
   id:id++,
   message,
   level,
   source,
   time:new Date().toISOString()
 };

 logs.push(newLog);

 res.json({
   status:"added",
   log:newLog
 });
});

/* Detect */
app.post("/detect",(req,res)=>{

 const prediction = Math.random() > 0.7 ? 1 : 0;

 res.json({
   success:true,
   prediction,
   status: prediction ? "attack" : "normal"
 });

});

/* Stats */
app.get("/stats",(req,res)=>{
 res.json({
   total:logs.length,
   high:logs.filter(x=>x.level==="high").length,
   low:logs.filter(x=>x.level==="low").length
 });
});

/* Start */
app.listen(PORT,()=>{
 console.log("Server running on port " + PORT);
});