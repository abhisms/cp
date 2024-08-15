const mongoose = require("mongoose")
const { Schema } = mongoose

studentSchema = new Schema({
    s_name: {
        type:String,
        require:true

    },
    s_phone: {
        type:Number

    },
    s_address: {
        type:String,
        require:true

    },
    s_email: {
        type:String,
        require:true

    },
    s_password: {
        type:String,
        require:true

    },
    register_no: {
        type:String,
        require:true

    },
    branch_id: {
        type:mongoose.Types.ObjectId,
        ref:"branch"

    },
    hod_id: {
        type:mongoose.Types.ObjectId,
        ref:"hod"
        
    },
    s_photo: {
        type:String,
        require:true

    },
    s_resume: {
        type:String,
        require:true

    }

})
module.exports=mongoose.model("student",studentSchema)
