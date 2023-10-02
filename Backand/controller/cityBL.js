const cityModel = require("../models/cityModel")
const getCity = () => {
    return new Promise((resolve, reject) => {

        cityModel.find({}, (err, city) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(city)
            }
        })
    })
}
const createCity = (obj) => {
    return new Promise((resolve, reject) => {
        let city = new cityModel(obj)
        city.save((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}
const updateCity = (id, obj) => {
    return new Promise((resolve, reject) => {
        cityModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const deleteCity = (id) => {
    return new Promise((resolve, reject) => {
        cityModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("delete!!!")
            }
        })
    })
}
module.exports = { getCity, createCity, updateCity, deleteCity }
