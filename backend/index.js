const express = require("express")
const app= express()
const mongoose=require("mongoose")
const Admin=require("./models/admin")
const Message=require("./models/message")
const cors=require("cors")
require("dotenv").config()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


mongoose.connect(process.env.MONGO_URL).then(
    console.log("database is connected successfully")
)



app.post("/login",async(req,res)=>{
    const {username,password}=req.body
    if(!username && !password){
        res.status(400).json({message:"username and password is require"})
    } 

    try{
        const user=await Admin.findOne({username})    
        if (!user) {
             res.status(400).json({ message: "Invalid credentials" });
          }
          
          
         if(user.password !== password){
            res.status(400).json({ message: "Invalid password" });
         }else{
            res.status(200).json({ message: "successfully match username password" });
         }

        
      
    }catch{
         res.status(500).json({error:error})
    }


})


app.post("/message",async(req,res)=>{
    console.log(req.body)
    const {fullName,email="",mobile="",subject="",message=""}=req.body
    if(!fullName){
        res.status(400).json({message:"fullname require"})
    } 

    try{
         await Message.create({fullName,email,mobile,subject,message})   
          res.status(200).json({message:"message is store successfully"})
    }catch{
         res.status(500).json({error:error})
    }


})
const Port=3001

app.listen(Port,()=>{
    console.log("server is running successfully",Port)
})


