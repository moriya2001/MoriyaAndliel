const express = require('express')
const cors = require('cors');
const app = express()
require("./config/database")

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const giftRouter = require("./Routes/giftRoutes")
const messageRouter = require("./Routes/messageRoutes")
const volunteerTypeRouter = require("./Routes/volunteerTypeRoutes")
const usersRouter = require("./Routes/usersRoutes")
const volunteerGiftRouter = require("./Routes/giftRoutes")
const volunteeringRouter = require("./Routes/volunteeringRoutes")
const volunteerTovolunteerRouter = require("./Routes/volunteerTovolunteerRouts")
const cityRouter = require("./Routes/cityRoutes")
const {connectToDB} = require("./config/database");

app.use("/gift", giftRouter)
app.use("/message", messageRouter)
app.use("/volunteerType", volunteerTypeRouter)
app.use("/users", usersRouter)
app.use("/volunteerGift", volunteerGiftRouter)
app.use("/volunteering", volunteeringRouter)
app.use("/volunteerToVolunteer", volunteerTovolunteerRouter)
app.use("/city", cityRouter)
app.use("/volunteering/search", volunteeringRouter)
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/getUserName',(req,res)=>{
//     res.send('Liel');
// })
// const userRoute=require("./Routes/usersRoutes")
// app.use("/users",userRoute)
const port = 8000
app.listen(port, () => {

    console.log(`helpme app listening on port ${port}`)
})
