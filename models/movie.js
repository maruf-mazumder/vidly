const Joi = require('joi');
const objectID = require('../index')
const mongoose = require('mongoose');
const {genreSchema} =require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:44
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
}));

function validateMovie(movie) {
    
    const schema = {
        title:Joi.string().min(5).max(50).required(),
        genreID:Joi.objectID().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    };
    // console.log('reached')
    const result = Joi.validate(movie,schema);
    // console.log(result);
    return result
}


exports.validate=validateMovie;
exports.Movie=Movie;