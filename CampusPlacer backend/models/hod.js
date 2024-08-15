const mongoose = require("mongoose")
const { Schema } = mongoose

const hodSchema = new Schema({
    h_name: {
        type:String,
        required:true

    },
    h_phone: {
        type:Number,
        required:true

    },
    h_email: {
        type:String,
        required:true

    },
    h_address: {
        type:String,
        required:true

    },
    h_password: {
        type:String,
        required:true

    },
    branch_id: {
        type: mongoose.Types.ObjectId, // Correctly reference mongoose.Types.ObjectId
        ref: "branch"

    },
    h_photo: {
        type:String,
        required:true

    }

})

module.exports = mongoose.model("hod", hodSchema)