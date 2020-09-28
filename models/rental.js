const Joi = require('joi');
const mongoose = require('mongoose');
const objectID = require('../index')



const Rental = mongoose.model('Rental',new mongoose.Schema({
    customer:{                              //We are not reusing the 'customer schema' that we defined in
                                            //the 'customers' module. Becoz, our customer document may have 50 properties.We dont wanna show all of them inside this embedded 'customer' document here.We only need primary properties to display inside the rental object.Thats why we use a different schema here.
        type: new mongoose.Schema({
            name: {
                type:String,
                required:true,
                minlength:5,
                maxlength:50
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true
            }
        }),
        required:true
    },
    movie:{                                             //We dont reuse the 'movieSchema' defined in 
                                                        //'movie' module
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            }

        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }

}));

function validateRental(rental) {
    const schema ={
        customerID:Joi.objectID().required(),
        movieID:Joi.objectID().required()
    }
    return Joi.validate(rental,schema);
}

exports.validate=validateRental;
exports.Rental=Rental;