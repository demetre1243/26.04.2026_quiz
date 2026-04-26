let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const connectDB = require('./config/db');
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

let app = express();

connectDB();

const seedData = async () => {
    try {
        const author = new Author({
            fullName: 'George Orwell',
            bio: 'English novelist',
            birthYear: 1903,
            country: 'UK'
        });

        const savedAuthor = await author.save();

        const book = new Book({
            title: '1984',
            author: savedAuthor._id,
            genres: ['Dystopian'],
            pageCount: 328,
            reviews: [
                {
                    reviewerName: 'John',
                    rating: 6,
                    comment: 'Great book'
                }
            ]
        });

        const savedBook = await book.save();

        const user = new User({
            username: 'demoUser',
            email: 'invalid-email',
            membership: 'premium',
            age: 21,
            borrowedBooks: [savedBook._id]
        });

        await user.save();

    } catch (error) {
        console.log(error.message);

        if (error.errors) {
            for (let field in error.errors) {
                console.log(`${field}: ${error.errors[field].message}`);
            }
        }
    }
};

seedData();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;