const mongoose = require("mongoose")
const { Schema } = mongoose

const branchSchema = new Schema({
    branch_name: {
        type:String,
        required:true

    },
    b_status: {
        type:String,
        default:"Active"
        

    },
    b_date: {
        type:Date,
        default:Date.now

    }
})

module.exports = mongoose.model("branch", branchSchema)