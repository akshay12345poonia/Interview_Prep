const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    apiKey: {
        type: String,
        required: true,
        unique: true,
    },
    apiKeyHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.index({ email: 1 });
userSchema.index({ apiKeyHash: 1 });

module.exports = mongoose.model('User', userSchema);