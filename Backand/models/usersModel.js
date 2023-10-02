const mongoose=require("mongoose")
let userSchema=new mongoose.Schema({
    FirstName:String,
    LastName:String,
    Tz:String,
    BirthYear:String,
    Phone:String,
    Password:String,
    Status:Boolean,
    IsApproved:Number,
    Coins:Number,
    Email:String,
    Gender:String,
    About:String,
    giftsIds: [String]
 })
const model=mongoose.model("user",userSchema)
module.exports=model