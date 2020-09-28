const winston = require('winston')
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const app = express();


require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db.js')();
require('./startup/config')();
require('./startup/validation')();

// const joiObjectid = require('joi-objectid');





// throw new Error('Something went wrong during startup');//sync code with an exception 

// const p = Promise.reject(new Error('Failed miserably...!!'))
//          p.then(()=>{console.log('Done')})






// console.log(`NODE ENVIRONMENT : ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`); 

//Configuration
console.log("Application Name :", config.get('name'));
console.log("Mail Server :", config.get('mail.host'));

if (app.get('env')==='development') {
    app.use(morgan('tiny'));
    console.log("Morgan Enabled...");
}





// app.get('/api/genres/:month/:year',(req,res)=>{
//     res.send(req.query);
// });



const port = process.env.PORT || 3000;
app.listen(port,()=>{winston.info(`Listening on port no ${port}`)});



// module.exports = Joi.objectID;