const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    //move db initialization code here
    mongoose.connect('mongodb://localhost/vidly')
    .then(()=>winston.info('connected to mongodb'))
} 