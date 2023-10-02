const volunteerGiftModel = require("../models/volunteerGiftModel")
const getVolunteerGift = () => {
    return new Promise((resolve, reject) => {

        volunteerGiftModel.find({}, (err, gift) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(gift)
            }
        })
    })
}
const createVolunteerGift = (obj) => {
    return new Promise((resolve, reject) => {
        let volunteerGift = new volunteerGiftModel(obj)
        volunteerGift.save((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}
const updateVolunteerGift = (id, obj) => {
    return new Promise((resolve, reject) => {
        volunteerGiftModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const deleteVolunteerGift = (id) => {
    return new Promise((resolve, reject) => {
        volunteerGiftModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("delete!!!")
            }
        })
    })
}
module.exports = { getVolunteerGift, createVolunteerGift, updateVolunteerGift, deleteVolunteerGift }
