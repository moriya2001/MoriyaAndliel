// config.js

const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/HelpMeDB";
mongoose.set("strictQuery", false);
mongoose.connect(URL, () => {
    console.log("connected to DB")
})
