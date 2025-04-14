const mongoose = require("mongoose");
const User = mongoose.model('user', userSchema);
const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    }
}, {timestamps: true} 
);
module.exports = User;
