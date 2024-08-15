const express = require("express")
const { JobInsert, Get, Update, Delete } = require("../controller/joblistController")

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
const routes = express.Router()

routes.post("/insert", upload.single('cover_photo'), JobInsert)
routes.get("/get", Get)
routes.get("/get/:id", Get)
routes.put("/update/:id", upload.single('cover_photo'), Update)
routes.delete("/delete/:id", Delete)

module.exports = routes