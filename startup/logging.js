require('winston-mongodb');
require('express-async-errors');
const winston = require('winston');



module.exports = function () {
    //Move all codes related to winston + rejected promise handlers
    // process.on('uncaughtException',(ex)=>{                  //Works for handling exceptions in sync code
//     console.log('We caught an error during startup...');
//     winston.error(ex.message, ex);
// });

winston.handleExceptions(
    
    new winston.transports.Console({colorize:true, prettyPrint:true}),
    new winston.transports.File({filename:'uncaughtExceptions.log'})
    
    );

process.on('unhandledRejection',(ex)=>{
    // winston.error(ex.message);
    // console.log('We got an unhandled rejection...')
    // process.exit(1);
    throw ex;
});

winston.add(winston.transports.File,{filename:"logger.log"});
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" , 
                                            level:"info" });


}