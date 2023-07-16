const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    accessToken : {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("User", userSchema);