const mongoose=require("mongoose")

let volunteeringSchema = new mongoose.Schema({
    Name:String,
    Url:String
})

const model = mongoose.model("VolunteerType", volunteeringSchema)
module.exports = model
