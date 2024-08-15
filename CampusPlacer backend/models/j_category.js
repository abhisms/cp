const mongoose= require('mongoose')
const {Schema} = mongoose
const categorySchema = new Schema({
    j_category:{
        type:String,
        require:true
    },
    j_date:{
        type:Date,
        default:Date.now

    },
    j_status:{
        type:String,
        default:"Active"

    }
})

module.exports=mongoose.model("category",categorySchema)