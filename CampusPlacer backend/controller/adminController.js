const adminSchema = require('../models/admin');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()
const AdminInsert = async (req, res) => {
    try {

        const { name, email, phone, password } = req.body
        //console.log(req.file.filename)
        const check = await adminSchema.find({ email })
        if (check.length > 0) {
            return res.json({ success: false, message: "email already exists" })
        }
        else {
            const salt = await bcryptjs.genSalt(10)
            console.log(salt)
            const secpass = await bcryptjs.hash(password, salt)
            console.log(secpass)

            const admin = await adminSchema({ name, email, phone, password: secpass, image: req.file.filename })

            await admin.save()
            return res.json({ success: true, savedUser: admin })
        }
    }
    catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}

const Get = async (req, res) => {
    try {
        const id = req.params.id;  // Get the ID from the request parameters
        const admin = await adminSchema.findById(id);  // Find the admin by ID

        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.json({ success: true, admin });
    } catch (err) {
        console.log("Error:" + err.message);
        res.status(500).send("Internal server error");
    }
};


// const Get = async (req, res) => {
//     try {
//         if(req.params.id){
//             const admin = await adminSchema.findById(req.params.id);
//         res.json({ success: true, admin })

//         }


//     } catch (err) {
//         console.log("Error:" + err.message)
//         res.send("Internal server error")
//     }
// }

const Delete = async (req, res) => {
    try {
        const id = req.params.id
        //console.log(id)
        const check = await adminSchema.find();
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const deleteData = await adminSchema.findByIdAndDelete(id);
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
        const check = await adminSchema.findById(id);
        if (!check) {
            res.json({ success: false, message: "not found" })
        } else {
            const { name, phone, email, password } = req.body
            const newData = {}
            // const salt = await bcryptjs.genSalt(10)
            // const secpass = await bcryptjs.hash(password, salt)
            if (name) { newData.name = name }
            if (phone) { newData.phone = phone }
            if (email) { newData.email = email }
            if (password) {
                const salt = await bcryptjs.genSalt(10)
                const secpass = await bcryptjs.hash(password, salt)
                newData.password = secpass
            }
            if (req?.file?.filename) {
                newData.image = req?.file?.filename
            }
            const UpdatedData = await adminSchema.findByIdAndUpdate(id, { $set: newData }, { new: true });
            return res.json({ success: true, UpdatedData })
        }


    } catch (err) {
        console.log("Error:" + err.message)
        res.send("Internal server error")
    }
}


module.exports = { AdminInsert, Delete, Update, Get }