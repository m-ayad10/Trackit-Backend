const mongoose=require('mongoose')
require('dotenv').config()


const mongo_url=process.env.MONGO_URL

mongoose.connect(mongo_url)
const db=mongoose.connection

db.on('connected',()=>{
    console.log('MongoDb connected');
})

db.on('disconnected',()=>{
    console.log('MongoDb disconnected');
})

db.on('error',(error)=>{
    console.log('MongoDb connection error',error);
})

module.exports=db