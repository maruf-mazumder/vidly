const Joi =require('joi');


module.exports = function () {
    Joi.objectID = require('joi-objectid')(Joi);// LHS returns a function. We add that function to the 'Joi'
                                            //object (which is returned by 'joi' module) using a custom propert,ie- 'objectID'. That means the function is stored inside 'objectID' property of 'Joi' object.
                                            //Here, 'objectID' is a function
}