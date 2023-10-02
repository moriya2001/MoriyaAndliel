const mongoose=require("mongoose")
let volunteerGiftSchema=new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        
    },
    idGift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gift",
        
    }
   
    
})
const model=mongoose.model("volunteerGift",volunteerGiftSchema)
module.exports=model