const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema({
    student_id: {
        type: mongoose.Schema.ObjectId, // Reference to the student model
        ref: 'student',
        required: true
    },
    resume: {
        type: String, // This needs to be uploaded by the student
        required: true
    },
    job_id: {
        type: mongoose.Schema.ObjectId, // Reference to the job list model
        ref: 'joblist',
        required: true
    },
    ap_status: {
        type: String,
        default: 'Applied'
    },
    ap_date: {
        type: Date,
        default: Date.now
    },
    course_id: {
        type: mongoose.Schema.ObjectId, // Reference to the branch model
        ref: 'branch',
        required: true
    },
    YOG: {
        type: Number,
        required: true
    },
    CGPA: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("application", applicationSchema);
