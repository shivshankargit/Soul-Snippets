const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }, 

    username: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    lastLogin: {
		type: Date,
		default: Date.now,
	},

    verificationToken: {
        type: String
    },

    verificationTokenExpiresAt: {
        type: Date
    },

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpiresAt: {
        type: Date
    },

    lastQuoteSentAt: {
        type: Date,
        default: null
    },

    wantsQuotes: { 
        type: Boolean, 
        default: true 
    },

}, {timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports =  User;