const adminSchema = require('../models/admin');
const hodSchema = require('../models/hod');
const placementSchema = require('../models/placement')
const studentSchema = require('../models/student')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()



const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkadmin = await adminSchema.findOne({ email }) //email:email // find function will return array findone will return only object 
        //email:email // find function will return array findone will return only object 
        const checkhod = await hodSchema.findOne({ h_email: email })
        const checkPlacement_officer = await placementSchema.findOne({ p_email: email })
        const checkStudent = await studentSchema.findOne({ s_email: email })

        if (checkadmin) {
            const passwordCompare = await bcryptjs.compare(password, checkadmin.password)  // we have to pass two things
            if (!passwordCompare) {
                return res.json({ success: false, message: "Incorrect email or password" })
            }

            else {
                const data = checkadmin.id
                console.log(data)
                const token = await jwt.sign(data, process.env.JWT_SECRET) // we have to pass two things id ad secreat key
                return res.json({ success: true, message: "Login successfull", token, name: checkadmin.name, role: "admin" ,id:checkadmin.id})
            }

        }

        else if (checkhod) {
            const passwordCompare = await bcryptjs.compare(password, checkhod.h_password)  // we have to pass two things
            if (!passwordCompare) {
                return res.json({ success: false, message: "Incorrect email or password" })
            }

            else {
                const data = checkhod.id
                console.log(data)
                const token = await jwt.sign(data, process.env.JWT_SECRET) // we have to pass two things id ad secreat key
                return res.json({ success: true, message: "Login successfull", token, name: checkhod.h_name, role: "hod",id:checkhod.id })
            }

        }

        else if (checkPlacement_officer) {
            const passwordCompare = await bcryptjs.compare(password, checkPlacement_officer.p_password)  // we have to pass two things
            if (!passwordCompare) {
                return res.json({ success: false, message: "Incorrect email or password" })
            }

            else {
                const data = checkPlacement_officer.id
                console.log(data)
                const token = await jwt.sign(data, process.env.JWT_SECRET) // we have to pass two things id ad secreat key
                return res.json({ success: true, message: "Login successfull", token, name: checkPlacement_officer.p_name, role: "placement_officer",id:checkPlacement_officer.id })
            }

        }


        else if (checkStudent) {
            const passwordCompare = await bcryptjs.compare(password, checkStudent.s_password)  // we have to pass two things
            if (!passwordCompare) {
                return res.json({ success: false, message: "Incorrect email or password" })
            }

            else {
                const data = checkStudent.id
                console.log(data)
                const token = await jwt.sign(data, process.env.JWT_SECRET) // we have to pass two things id ad secreat key
                return res.json({ success: true, message: "Login successfull", token, name: checkStudent.s_name, role: "student" ,id:checkStudent.id})
            }

        }

    }
    catch (err) {
        console.log("Error", err.message)
        res.status(500).send("Internal server error")
    }
}

module.exports = { Login }