const adminSchema = require('../models/admin');
const hodSchema = require('../models/hod');
const placementSchema = require('../models/placement');
const studentSchema = require('../models/student');
const bcryptjs = require('bcryptjs')

const changePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);

        let user = await adminSchema.findOneAndUpdate({ email }, { password: hashedPassword });
        if (!user) {
            user = await hodSchema.findOneAndUpdate({ h_email: email }, { password: hashedPassword });
        }
        if (!user) {
            user = await placementSchema.findOneAndUpdate({ p_email: email }, { password: hashedPassword });
        }
        if (!user) {
            user = await studentSchema.findOneAndUpdate({ s_email: email }, { password: hashedPassword });
        }

        if (user) {
            return res.status(200).json({ success: true, message: "Password changed successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { changePassword };

