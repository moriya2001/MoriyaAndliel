const mongoose=require("mongoose")
let citySchema=new mongoose.Schema({
Name:String

})
const model=mongoose.model("city",citySchema)
module.exports=model