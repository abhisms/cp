const express = require('express');
const { Login } = require('../controller/loginController');
const routes = express.Router()


routes.post("/login", Login)

module.exports = routes