const mongoose=require("mongoose")
let messageSchema=new mongoose.Schema({
MessageContent:String,
Date:String,
Time:String,
Status:Boolean,
idUserSend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
    
},
idUserGet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
    
}
   
    
})
const model=mongoose.model("message",messageSchema)
module.exports=model