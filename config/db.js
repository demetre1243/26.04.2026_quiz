const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/libraryDB');

        console.log('MongoDB connected');

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.log('MongoDB error:', err);
        });

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;