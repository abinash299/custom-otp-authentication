const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userEmail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    otp: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);