const express=require("express")
const router=express.Router()
const messageBL=require("../controller/messageBL")
router.get("/",async function (req,res){
    try{
        let data=await messageBL.getMessage()
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({msg:err})
    }
})
router.post("/",async function (req,res){
    let message=req.body
    await messageBL.createMessage(message)
    res.send("created!!!")
})
router.put("/:id",async function (req,res){
    let id=req.params.id
    let message=req.body
    let status=await messageBL.updateMessage(id,message)
    res.status(200).json({msg:status})
})
router.delete("/:id",async function(req,res){
    let id=req.params.id
    let status=await messageBL.deleteMessage(id)
    res.status(200).json({msg:status})
})

module.exports = router