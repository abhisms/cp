const express = require('express')
const routes = express.Router()
const { ForgotPassword } = require('../controller/forgotpasswordController')

routes.post('/forgotpass', ForgotPassword)

module.exports = routes

