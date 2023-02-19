const express= require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel}=require("../model/model")
const userrouter= express.Router()
userrouter.use(express.json())


userrouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    try{
        bcrypt.hash(pass, 4,async(err, hash)=> {
            if(err){
                res.send({"msg":"unable to bcrypt","err":err.message})
            }else{
                const user=new UserModel({name,email,pass:hash})
                await user.save()
                res.send("new user  is registered")
            }
        });
       
    }catch(err){
        res.send({"msg":"something went wrong","error":err.message})
    }
})

userrouter.post("/login",async(req,res)=>{
    try{
        let user =await UserModel.findOne({email:req.body.email})
        let token = jwt.sign({userid:user._id},process.env.secretKey,{expiresIn:"1h"})
        res.send({name:user.name,token:token})
    }catch(err){
        res.send({err:`${err.message}`})
    }
    
})

module.exports={
    userrouter
}