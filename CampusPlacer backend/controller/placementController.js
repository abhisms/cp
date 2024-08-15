const placementSchema = require('../models/placement')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()


const placementRegister = async (req, res) => {
    try {

        const { p_name, p_phone, p_email, p_address, p_password, p_photo } = req.body
        const check = await placementSchema.find({ p_email })
        if (check.length > 0) {
            return res.json({ success: false, message: "email or register number already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            const secpass = await bcryptjs.hash(p_password, salt)
            const placement_officer = await placementSchema({ p_name, p_phone, p_email, p_address, p_password: secpass, p_photo: req.file.filename })
            await placement_officer.save()
            return res.json({ success: true, savedUser: placement_officer })
        }
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}


const Get = async (req, res) => {
    try {
        const placement_officer = await placementSchema.find()
        res.json({ success: true, placement_officer })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}
const GetById = async (req, res) => {
    try {
        const id = req.params.id
        const placement_officer = await placementSchema.findById(id)
        res.json({ success: true, placement_officer })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}



const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await placementSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await placementSchema.findByIdAndDelete(id);
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
        const check = await placementSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { p_name, p_phone, p_email, p_address } = req.body
            const newData = {}
            //const salt = await bcryptjs.genSalt(10)
            //const secpass = await bcryptjs.hash(password, salt)
            if (p_name) { newData.p_name = p_name }
            if (p_phone) { newData.p_phone = p_phone }
            if (p_email) { newData.p_email = p_email }
            if (p_address) { newData.p_address = p_address }
            if (req?.file?.filename) {
                newData.p_photo = req?.file?.filename
            }


            const UpdatedData = await placementSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}



module.exports = { placementRegister, Get, Delete, Update ,GetById}
