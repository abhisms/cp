const express = require('express')
const routes = express.Router()
const { changePassword } = require('../controller/newpasswordController')

routes.post("/newpass", changePassword)
module.exports = routes

