const {genres} = require('../routes/courses');
const home = require('../routes/home');

const {R} = require('../routes/customers')
const movies = require('../routes/movies');
const users = require('../routes/users');
const auth = require('../routes/auth');
const rentals = require('../routes/rentals');
const error = require("../middleware/error")
const express = require('express');


module.exports=function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static('public'));
    app.use('/api/genres', genres);
    app.use('/',home);
    app.use('/api/customers',R);
    app.use('/api/movies/',movies)
    app.use('/api/rentals/',rentals);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    app.use(error);
}