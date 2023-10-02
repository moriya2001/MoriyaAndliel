const express=require("express")
const router=express.Router()
const societyBL=require("../controller/volunteerTypeBL")

router.get("/",async function (req,res){
    try{
        let data=await societyBL.getSociety()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({msg:err})
    }
})
router.get("/:id", async function (req, res) {
    let id = req.params.id
    let volunteerType = await societyBL.getVolunteerTypeById(id)
    res.json(volunteerType)
})
router.post("/",async function (req,res){
    let society=req.body
    await societyBL.createSociety(society)
    res.send("created!!!")
})

router.put("/:id",async function (req,res){
    let id=req.params.id
    let society=req.body
    let status=await societyBL.updateSociety(id,society)
    res.status(200).json({msg:status})
})

router.delete("/:id",async function(req,res){
    let id=req.params.id
    let status=await societyBL.deleteSociety(id)
    res.status(200).json({msg:status})
})

module.exports = router
