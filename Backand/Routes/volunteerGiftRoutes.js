const express=require("express")
const router=express.Router()
const volunteerGiftBL=require("../controller/volunteerGiftBL")
router.get("/",async function (req,res){
    try{
        let data=await volunteerGiftBL.getVolunteerGift()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({msg:err})
    }
})
router.post("/",async function (req,res){
    let volunteerGift=req.body
    await volunteerGiftBL.createVolunteerGift(volunteerGift)
    res.send("created!!!")
})
router.put("/:id",async function (req,res){
    let id=req.params.id
    let volunteerGift=req.body
    let status=await volunteerGiftBL.updateVolunteerGift(id,volunteerGift)
    res.status(200).json({msg:status})
})
router.delete("/:id",async function(req,res){
    let id=req.params.id
    let status=await volunteerGiftBL.deleteVolunteerGift(id)
    res.status(200).json({msg:status})
})

module.exports = router