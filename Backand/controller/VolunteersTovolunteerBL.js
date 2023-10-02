const volunteerTovolunteer = require("../models/VolunteersToVolunteerModel")
const getVolunteeringToVolunteer = () => {
    return new Promise((resolve, reject) => {

        volunteerTovolunteer.find({}, (err, volunteering) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(volunteering)
            }
        })
    })
}
const createVolunteeringToVolunteer = (obj) => {
    return new Promise((resolve, reject) => {
        let volunteering = new volunteerTovolunteer(obj)
        volunteering.save((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}
const updateVolunteeringToVolunteer = (id, obj) => {
    return new Promise((resolve, reject) => {
        volunteerTovolunteer.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const deleteVolunteeringToVolunteer = (id) => {
    return new Promise((resolve, reject) => {
        volunteerTovolunteer.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("delete!!!")
            }
        })
    })
}
module.exports = { getVolunteeringToVolunteer, createVolunteeringToVolunteer, updateVolunteeringToVolunteer, deleteVolunteeringToVolunteer }