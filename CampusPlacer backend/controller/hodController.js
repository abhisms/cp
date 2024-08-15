const hodSchema = require('../models/hod')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()



const hodRegister = async (req, res) => {
    try {

        const { h_name, h_phone, h_email, h_password, h_address, branch_id } = req.body
        const check = await hodSchema.find({ h_email })
        if (check.length > 0) {
            return res.json({ success: false, message: "email or register number already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            //console.log(salt)
            const secpass = await bcryptjs.hash(h_password, salt)
            //console.log(secpass)
            const hod = await hodSchema({ h_name, h_phone, h_email, h_address, branch_id, h_password: secpass, h_photo: req.file.filename })
            await hod.save()
            return res.json({ success: true, savedUser: hod })
        }
    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

// const login = async (req, res) => {
//     try {
//         const {name, phone, email, password,regno,address,course,dob,gender ,fid } = req.body
//         const check = await studentSchema.findOne({ email })
//         if (check) {
//             const passCompare = await bcryptjs.compare(password, check.password);
//             if (!passCompare) {
//                 return res.json({ success: false, message: "Incorrect password or email" })
//             }
//             else{
//                 const data = check.id
//                 const token = await jwt.sign(data,process.env.JWT_SECRET)
//                 return res.json({success:true,message:"Login successful"})
//             }

//         }
//         else {
//                 return   res.json({ success: false, message: "Incorrect password or email" })

//         }

//     } catch (err) {
//         console.log("Error:" + err.message)
//         res.send("Internal server error")

//     }
// }

const Get = async (req, res) => {
    try {
        //const student = await studentSchema.find({ name: "abhishek" });
        const hod = await hodSchema.find().populate("branch_id")
        res.json({ success: true, hod })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}
const GetById = async (req, res) => {
    try {
        const id = req.params.id
        const hod = await hodSchema.findById(id).populate("branch_id")
        res.json({ success: true, hod })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await hodSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await hodSchema.findByIdAndDelete(id);
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
        const check = await hodSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { h_name, h_phone, h_email, h_address, branch_id } = req.body
            const newData = {}
            //const salt = await bcryptjs.genSalt(10)
            //const secpass = await bcryptjs.hash(password, salt)
            if (h_name) { newData.h_name = h_name }
            if (h_phone) { newData.h_phone = h_phone }
            if (h_email) { newData.h_email = h_email }
            if (h_address) { newData.h_address = h_address }
            if (branch_id) { newData.branch_id = branch_id }
            if (req?.file?.filename) {
                newData.h_photo = req?.file?.filename
            }


            const UpdatedData = await hodSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports = { hodRegister, Get, Update, Delete,GetById }