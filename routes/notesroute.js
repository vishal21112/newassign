require("dotenv").config()
const express = require("express")
const {notemodel} = require("../model/model")

const noterouter = express.Router()

noterouter.use(express.json())

noterouter.post("/newnote",async(req,res)=>{
    try{
        let note = new notemodel(req.body)
        await note.save()
        res.send({msg:`new note has added to db ...`})
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

noterouter.get("/",async(req,res)=>{
    try{
        let note = await notemodel.find({auther:req.body.auther})
        res.send(note)
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

noterouter.patch("/update/:id",async(req,res)=>{
    try{
        await notemodel.findByIdAndUpdate({_id:req.params.id},req.body)
        res.send({msg:`note has updated to database`})
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

noterouter.delete("/delete/:id",async(req,res)=>{
    try{
        await notemodel.findByIdAndDelete({_id:req.params.id})
        res.send({msg:`note has deleted to database`})
    }catch(err){
        res.send({err:`${err.message}`})
    }
})

module.exports={noterouter}