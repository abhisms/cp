const mongoose = require('mongoose');
const { Schema } = mongoose;
const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model("admin", adminSchema)