const mongoose=require('mongoose')

const UserScheema=new mongoose.Schema({
    email:{
        uniquie:true,
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String
    }
})

const UserModel=mongoose.model('user',UserScheema)

module.exports=UserModel