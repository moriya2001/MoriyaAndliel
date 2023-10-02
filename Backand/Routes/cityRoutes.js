const express=require("express")
const router=express.Router()
const cityBL=require("../controller/cityBL")
router.get("/",async function (req,res){
    try{
        let data=await cityBL.getCity()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({msg:err})
    }
})
router.post("/",async function (req,res){
    let city=req.body
    await cityBL.createCity(city)
    res.send("created!!!")
})
router.put("/:id",async function (req,res){
    let id=req.params.id
    let city=req.body
    let status=await cityBL.updateCity(id,city)
    res.status(200).json({msg:status})
})
router.delete("/:id",async function(req,res){
    let id=req.params.id
    let status=await cityBL.deleteCity(id)
    res.status(200).json({msg:status})
})

module.exports = router