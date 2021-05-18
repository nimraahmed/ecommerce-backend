const mongoose = require('mongoose');

//customer model
const userSchema = new mongoose.Schema({

    firstname:{
        type: String,
        required: true,
        min: 5,
        max: 15
    },

    lastname: {
        type: String,
        required: true,
        min: 5,
        max: 15
    },

    email: {
        type: String,
        required: true,
    },

    // mobile: {
    //     type: Number,
    //     required: true
    // },

    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    role:{
        type: String,
        enum: ["admin", "user"]
    },

    versionKey: false
});

module.exports = mongoose.model('User', userSchema);