const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    }
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    genres: [String],
    pageCount: {
        type: Number,
        min: 10
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Book', bookSchema);