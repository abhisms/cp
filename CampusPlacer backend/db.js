const mongoose = require('mongoose');
const env = require('dotenv');
env.config()

const ConnectMongo = async()=>{
    try{
       await mongoose.connect(process.env.mongoURI)
        console.log("Connected");

    }catch(err){
        console.log("Not connected",err.message)
     

    }
}
module.exports=ConnectMongo