 const mongoose=require("mongoose")
 const messageSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    message:{
     type:String,
     
    },
    mobile:{
        type:String,
        
       },
    email:{
        type:String,
        
       },
    subject:{
        type:String,
        
       }
 })

 const Message= mongoose.model("Message",messageSchema)
 module.exports=Message