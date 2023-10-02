const giftModel = require("../models/giftModel")
const getGift = () => {
    return new Promise((resolve, reject) => {

        giftModel.find({}, (err, gift) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(gift)
            }
        })
    })
}
const createGift = (obj) => {
    return new Promise((resolve, reject) => {
        let gift = new giftModel(obj)
        gift.save((err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}
const updateGift = (id, obj) => {
    return new Promise((resolve, reject) => {
        giftModel.findByIdAndUpdate(id, obj, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("update!!!")
            }
        })
    })
}
const deleteGift = (id) => {
    return new Promise((resolve, reject) => {
        giftModel.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve("delete!!!")
            }
        })
    })
}

const findRelevantGift = async (user) => {
    return await giftModel.findOne({
        cost: {
            $lt: user.Coins
        },
        _id: {
            $nin: user.giftsIds,
        }
    }).lean().exec();
}

module.exports = { getGift, createGift, updateGift, deleteGift, findRelevantGift }
