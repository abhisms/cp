const categorySchema = require('../models/j_category')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()



const insert = async (req, res) => {
    try {

        const { j_category, j_status, j_date} = req.body
        const check = await categorySchema.find({ j_category })
        if (check.length > 0) {
            return res.json({ success: false, message: "Category already exists" })
        }
        else {
        
            const category = await categorySchema({ j_category, j_status, j_date})
            await category.save()
            return res.json({ success: true, savedUser: category })
        }
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

const Get = async (req, res) => {
    try {
        const category = await categorySchema.find()
        res.json({ success: true, category })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await categorySchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await categorySchema.findByIdAndDelete(id);
            return res.json({ success: true, deleteData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }

}

const Update = async (req, res) => {
    try {
        const id = req.params.id
        const check = await categorySchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { j_category, j_status, j_date} = req.body
            const newData = {}
            //const salt = await bcryptjs.genSalt(10)
            //const secpass = await bcryptjs.hash(password, salt)
            if (j_category) { newData.j_category = j_category }
            if (j_status) { newData.j_status = j_status }
            if (j_date) { newData.j_date = j_date }
          
        
            const UpdatedData = await categorySchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports = { insert,Get,Update,Delete }