const express= require('express');
const {Register,Delete, Update, Get,GetById} = require('../controller/studentController');
const routes = express.Router()
const multer =require('multer')


const storage =multer.diskStorage({
    destination:function(req,file,cb){
        if(file.fieldname=="s_photo"){
            cb(null,'uploads/photos')
        }
        else{
            cb(null,'uploads/resume')
            
        }
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ '-' + file.originalname)
    }
})
const upload = multer({storage:storage})

routes.post("/insert",upload.fields([{name:'s_photo',maxCount:1},{name:'s_resume',maxCount:1}]),Register)
routes.delete("/delete/:id",Delete)

routes.put("/update/:id",upload.fields([{name:'s_photo',maxCount:1},{name:'s_resume',maxCount:1}]), Update)
routes.get("/get/:id", Get)
routes.get("/get", Get)
routes.get("/getById/:id",GetById)
// routes.post("/login",Login)

module.exports=routes