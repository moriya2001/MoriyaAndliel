const mongoose=require("mongoose")
let giftSchema=new mongoose.Schema({
Cost:Number,
Url:String,
Name:String

})
const model=mongoose.model("gift",giftSchema)
module.exports=model