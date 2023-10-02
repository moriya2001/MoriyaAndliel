const messageModel = require("../models/messageModel")
const getMessage = () => {
    return new Promise((resolve, reject) => {

        messageModel.find({}, (err, user) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(user)
            }
        })
    })
}
const createMessage = (obj) => {
    return new Promise((resolve, reject) => {
        let message = new messageModel(obj)
        message.save((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}
const updateMessage = (id, obj) => {
    return new Promise((resolve, reject) => {
        messageModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        messageModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("delete!!!")
            }
        })
    })
}
module.exports = { getMessage, createMessage, updateMessage, deleteMessage }
