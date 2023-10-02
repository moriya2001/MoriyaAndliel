const mongoose=require("mongoose")
let x=new mongoose.Schema({
Cost:Number,
Description:String
})
const model=mongoose.model("x",x)
module.exports=model