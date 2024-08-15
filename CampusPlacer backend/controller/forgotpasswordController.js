const adminSchema = require('../models/admin');
const hodSchema = require('../models/hod');
const placementSchema = require('../models/placement');
const studentSchema = require('../models/student');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'campusplacers@gmail.com',
        pass: 'vnxt pdgk gcer ubth'
    },
    tls: {
        rejectUnauthorized: false // For development only; do not use in production
    }
});

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const sendOTPEmail = (email, otp) => {
    const mailOptions = {
        from: 'campusplacers@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    return transporter.sendMail(mailOptions);
}

const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const checkadmin = await adminSchema.findOne({ email });
        const checkhod = await hodSchema.findOne({ h_email: email });
        const checkPlacement_officer = await placementSchema.findOne({ p_email: email });
        const checkStudent = await studentSchema.findOne({ s_email: email });

        if (checkadmin || checkhod || checkPlacement_officer || checkStudent) {
            const otp = generateOTP();
            await sendOTPEmail(email, otp);
            return res.json({ success: true, message: "OTP sent to email", otp });
        } else {
            return res.json({ success: false, message: "Email Not Found" });
        }
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { ForgotPassword };
