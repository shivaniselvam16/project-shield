const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "shield_secret_key";

// MongoDB
mongoose.connect("mongodb://projectai370_db_user:shivix16@ac-pmrh4sd-shard-00-00.1zn5gct.mongodb.net:27017,ac-pmrh4sd-shard-00-01.1zn5gct.mongodb.net:27017,ac-pmrh4sd-shard-00-02.1zn5gct.mongodb.net:27017/?ssl=true&replicaSet=atlas-ijrevb-shard-0&authSource=admin&appName=project-shield-db")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* ---------------- TEMP LOGS ---------------- */
let logs = [
 {id:1,message:"Failed Login Attempts",level:"high",source:"Firewall"},
 {id:2,message:"Normal User Login",level:"low",source:"Auth"},
 {id:3,message:"Port Scan Detected",level:"high",source:"IDS"}
];

let id = 4;

/* ---------------- HOME ---------------- */
app.get("/", (req,res)=>{
 res.send("Project Shield Running with AI Detection");
});

/* ---------------- REGISTER ---------------- */
app.post("/register", async(req,res)=>{
 try{
   const {username,password} = req.body;

   const existing = await User.findOne({username});
   if(existing) return res.json({status:"failed",message:"User exists"});

   const hash = await bcrypt.hash(password,10);

   await User.create({username,password:hash});

   res.json({status:"success",message:"Registered"});
 }catch(err){
   res.json({status:"failed",message:err.message});
 }
});

/* ---------------- LOGIN ---------------- */
app.post("/login", async(req,res)=>{
 try{
   const {username,password} = req.body;

   const user = await User.findOne({username});
   if(!user) return res.json({status:"failed",message:"User not found"});

   const match = await bcrypt.compare(password,user.password);
   if(!match) return res.json({status:"failed",message:"Wrong password"});

   const token = jwt.sign({username},SECRET,{expiresIn:"1h"});

   res.json({
     status:"success",
     token,
     username
   });

 }catch(err){
   res.json({status:"failed",message:err.message});
 }
});

/* ---------------- LOGS ---------------- */
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

 res.json({status:"added",log:newLog});
});

/* ---------------- ML DETECTION (NEW) ---------------- */
app.post("/detect", async (req, res) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/predict", {
            "Destination Port": req.body.port || 80,
            "Flow Duration": req.body.duration || 100,
            "Total Fwd Packets": req.body.packets || 10
        });

        res.json({
            success: true,
            prediction: response.data.prediction,
            status: response.data.status
        });

    } catch (err) {
        res.json({
            success: false,
            error: err.message
        });
    }
});

/* ---------------- STATS ---------------- */
app.get("/stats",(req,res)=>{
 res.json({
   total: logs.length,
   high: logs.filter(x=>x.level==="high").length,
   low: logs.filter(x=>x.level==="low").length
 });
});

/* ---------------- START SERVER ---------------- */
app.listen(5000,()=>{
 console.log("Server running on port 5000");
});