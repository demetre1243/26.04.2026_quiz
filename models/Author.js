const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3
    },
    bio: {
        type: String,
        maxlength: 500
    },
    birthYear: {
        type: Number,
        max: new Date().getFullYear()
    },
    country: {
        type: String
    }
});

module.exports = mongoose.model('Author', authorSchema);