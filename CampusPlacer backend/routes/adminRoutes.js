const express = require('express');
const { AdminInsert, Delete, Update, Get } = require('../controller/adminController');
const routes = express.Router()
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

routes.post("/insert", upload.single('profile'), AdminInsert)
routes.delete("/delete/:id", Delete)

routes.put("/update/:id", upload.single('image'), Update)
routes.get("/get/:id", Get)
routes.get("/get", Get)


module.exports = routes