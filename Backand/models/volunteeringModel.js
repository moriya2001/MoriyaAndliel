const mongoose = require("mongoose")
let volunteeringSchema = new mongoose.Schema({
    Address: String,
    SDate: Date,
    NDate: Date,
    Description: String,
    Status: Number,
    idVolunteerUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    idVolunteerType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VolunteerType",
    },
    idCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",

    }
})
volunteeringSchema.pre('remove', function(next) {
    this.model('user').remove({ idVolunteerUser: this._id }, next);
});
const model = mongoose.model("volunteering", volunteeringSchema)
module.exports = model

