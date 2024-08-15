const mongoose = require("mongoose")
const { Schema } = mongoose

const joblistSchema = new Schema({

    company_name: {
        type: String,
        required: true
    },

    company_email:{
        type:String,
        required:true

    },

    job_title: {
        type: String,
        require: true
    },

    job_role: {
        type: String,
        require: true
    },

    category_id: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },

    job_discription: {
        type: String,
        require: true
    },

    salary: {
        type: String,
        require: true
    },

    shifts: {
        type: String,
        required: true
    },

    experience: {
        type: Number,
        required: true
    },

    last_date: {
        type: String,
        required: true
    },

    placement_officer_id: {
        type: mongoose.Types.ObjectId,
        ref: "placement"
    },

    cover_photo: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("joblist", joblistSchema)