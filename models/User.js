const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email']
    },
    membership: {
        type: String,
        enum: ['standard', 'premium', 'vip'],
        default: 'standard'
    },
    age: {
        type: Number,
        validate: {
            validator: function(v) {
                return v % 2 === 0;
            },
            message: 'Age must be an even number'
        }
    },
    borrowedBooks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);