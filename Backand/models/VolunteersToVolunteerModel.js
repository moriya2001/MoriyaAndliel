const mongoose=require("mongoose")
let volunteerTovolunteer=new mongoose.Schema({
    Status:Boolean,
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
        
    },
    idVolunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteering"
    }
   
})
const model=mongoose.model("volunteerTovolunteer",volunteerTovolunteer)
module.exports=model