const express=require("express")
const router=express.Router()
const giftBL=require("../controller/giftBL")
router.get("/",async function (req,res){
    try{
        let data=await giftBL.getGift()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({msg:err})
    }
})
router.post("/",async function (req,res){
    let gift=req.body
    await giftBL.createGift(gift)
    res.send("created!!!")
})
router.put("/:id",async function (req,res){
    let id=req.params.id
    let gift=req.body
    let status=await giftBL.updateGift(id,gift)
    res.status(200).json({msg:status})
})
router.delete("/:id",async function(req,res){
    let id=req.params.id
    let status=await giftBL.deleteGift(id)
    res.status(200).json({msg:status})
})

module.exports = router