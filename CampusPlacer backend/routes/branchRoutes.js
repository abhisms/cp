const express = require('express')
const { insert,Get,Update,Delete } = require('../controller/branchController')

const routes = express.Router()
routes.post("/insert",insert)
//routes.post("/login",login)
routes.get("/get",Get)
routes.put("/update/:id",Update)
routes.delete("/delete/:id",Delete)

module.exports=routes