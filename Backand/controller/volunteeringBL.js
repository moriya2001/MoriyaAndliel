const volunteeringModel = require("../models/volunteeringModel")
const UsersModel = require("../models/usersModel")

// var ObjectId = require('mongodb').ObjectID;
const mongoose = require("mongoose")
const getVolunteering = () => {
    return new Promise((resolve, reject) => {

        volunteeringModel.find({}).populate('idVolunteerType').populate('idCity').populate("idVolunteerUser").exec(function (err, volunteering) {
            if (err) {
                reject(err)
            }
            else {
                resolve(volunteering)
            }
        })
    })
}
const getPendingVolunteerings = (userId) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.find({ Status: 3 }).populate('idVolunteerType').populate('idCity').populate("idVolunteerUser").exec(function (err, volunteering) {
            if (err) {
                reject(err)
            }
            else {
                resolve(volunteering)
            }
        })
    })
}
const getVolunteeringsByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.find({ "idVolunteerUser": userId }).populate('idVolunteerType').populate('idCity').populate("idVolunteerUser").exec(function (err, volunteering) {
            if (err) {
                reject(err)
            }
            else {
                resolve(volunteering)
            }
        })
    })
}
const createVolunteering = (obj) => {
    return new Promise((resolve, reject) => {
        let volunteering = new volunteeringModel(obj)
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
const updateVolunteering = (id, obj) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const updateVolunteeringRemoveUser = (id, userId) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, { $set: { Status: 0 }, $unset: { idVolunteerUser: userId } }, (err, vol) => {
            if (err) {
                reject(err)
            }
            else {
                UsersModel.findByIdAndUpdate(userId, { $inc: { Coins: -1 } }, (err, vol) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("update!!!")
                    }
                });

            }
        })
    })
}
const updateVolunteeringApprove = (id) => {
    console.log("updateVolunteeringApprove", id)
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, { $set: { Status: 1 } }, (err, vol) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const updateVolunteer = (id, obj) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}

const deleteVolunteering = (id) => {
    return new Promise((resolve, reject) => {
        volunteeringModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("delete!!!")
            }
        })
    })
}

const getSearch = async (Edate, Sdate, city, idVolunteerType) => {
    console.log("aaaa")
    return await volunteeringModel
        .find({ Status: { $ne: 1 }, SDate: { $gte: new Date() } })
        .populate("idVolunteerType")
        .populate("idCity")
        .populate("idVolunteerUser")
        .exec()
        .then((volunteering) => {
            console.log(volunteering);
            return volunteering;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}
module.exports = {
    getVolunteering,
    createVolunteering,
    updateVolunteering,
    deleteVolunteering,
    getSearch,
    getVolunteeringsByUserId,
    updateVolunteeringRemoveUser,
    getPendingVolunteerings,
    updateVolunteeringApprove,
    updateVolunteer
}

