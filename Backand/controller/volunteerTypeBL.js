const societyModel = require("../models/VolunteerType")
const getSociety = () => {
    return new Promise((resolve, reject) => {

        societyModel.find({}, (err, society) => {
            if (err) {
                reject(err)
            } else {
                resolve(society)
            }
        })
    })
}
const getVolunteerTypeById = (id) => {
    return new Promise((resolve, reject) => {
        societyModel.findById(id, (err, user) => {
            if (err) {
                reject(err)
            } else {
                resolve(user)
            }
        })
    })
}
const createSociety = (obj) => {
    return new Promise((resolve, reject) => {
        let society = new societyModel(obj)
        society.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const updateSociety = (id, obj) => {
    return new Promise((resolve, reject) => {
        societyModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("update!!!")
            }
        })
    })
}


const deleteSociety = (id) => {
    return new Promise((resolve, reject) => {
        societyModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("delete!!!")
            }
        })
    })
}
module.exports = {getSociety, getVolunteerTypeById, createSociety, updateSociety, deleteSociety}
