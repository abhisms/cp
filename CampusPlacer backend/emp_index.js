const empSchema = require('./models/emp');
const ConnectMongo =require('./db');
const env = require('dotenv');
env.config()

ConnectMongo()

const express = require('express');
const app =express()
app.use(express.json())

//code for insert
app.post("/api/insert", async (req, res)=>{
    try{
        const {ename,phone,email,designation,salary}=req.body
        const emp= await empSchema({
            ename:ename,
            phone:phone,
            email:email,
            designation:designation,
            salary:salary
        })
        await emp.save()
        res.json({success:true,savedUser:emp})

    }catch(err){
        console.log("Error:"+err.message)
        res.send("Internal server error")
    }
})

//code for listener
app.listen(process.env.PORT,()=>{
    console.log("app listening on PORT:"+process.env.PORT)
})