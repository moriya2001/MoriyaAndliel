const express=require("express")
const router=express.Router()
const volunteerTovolunteerBL=require("../controller/VolunteersTovolunteerBL")
router.get("/",async function (req,res){
    try{
        let data=await volunteerTovolunteerBL.getVolunteeringToVolunteer()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({msg:err})
    }
})
router.post("/",async function (req,res){
    let volunteerToVolunteer=req.body
    await volunteerTovolunteerBL.createVolunteeringToVolunteer(volunteerToVolunteer)
    res.send("created!!!")
})
router.put("/:id",async function (req,res){
    let id=req.params.id
    let volunteerToVolunteer=req.body
    let status=await volunteerTovolunteerBL.updateVolunteeringToVolunteer(id,volunteerToVolunteer)
    res.status(200).json({msg:status})
})
router.delete("/:id",async function(req,res){
    let id=req.params.id
    let status=await volunteerTovolunteerBL.deleteVolunteeringToVolunteer(id)
    res.status(200).json({msg:status})
})

module.exports = router
