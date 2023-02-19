const mongoose = require("mongoose")

userschema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true}
},{
    versionKey:false
})

const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    auther:{type:String,required:true}
},{
    versionKey:false
})
const UserModel= mongoose.model("fullst",userschema)
const notemodel = mongoose.model('note',noteSchema)
module.exports={
    UserModel,notemodel
}