const branchSchema = require('../models/branch')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()



const insert = async (req, res) => {
    try {

        const { branch_name, b_status, b_date} = req.body
        const check = await branchSchema.find({ branch_name })
        if (check.length > 0) {
            return res.json({ success: false, message: "Branch already exists" })
        }
        else {
            //const salt = await bcryptjs.genSalt(10)
            //console.log(salt)
            //const secpass = await bcryptjs.hash(h_password, salt)
            //console.log(secpass)
            const branch = await branchSchema({ branch_name, b_status, b_date})
            await branch.save()
            return res.json({ success: true, savedUser: branch })
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
        const branch = await branchSchema.find()
        res.json({ success: true, branch })

    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await branchSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await branchSchema.findByIdAndDelete(id);
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
        const check = await branchSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { branch_name, b_status, b_date} = req.body
            const newData = {}
            //const salt = await bcryptjs.genSalt(10)
            //const secpass = await bcryptjs.hash(password, salt)
            if (branch_name) { newData.branch_name = branch_name }
            if (b_status) { newData.b_status = b_status }
            if (b_date) { newData.b_date = b_date }
          
        
            const UpdatedData = await branchSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

module.exports = { insert,Get,Update,Delete }