const express = require('express');
const mongoose  = require('mongoose');
const Joi = require('joi');
// const {Customer,validate} = require('../models/customer');
const router = express.Router();



const Customer = mongoose.model('Customer',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:44
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:5,
        maxlength:44
    },
    mail:{
        type:String,
        minlength:6 
    }
}));


function validate(customer){
    const schema ={
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean()
    }
   return Joi.validate(customer,schema)  
}







router.post('/',async (req,res)=>{
       const {error} = validate(req.body);
       if(error) return res.status(400).send(error.message);

       let customer =new Customer( {name: req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold} );
       customer = await customer.save()
       res.send(customer);
});

router.get('/', async (req,res)=>{
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.get('/:id', async (req,res)=>{
    const MyCustomer = await Customer.findById(req.params.id);
    res.send(MyCustomer);
});

router.put('/:id', async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.message);
    const result = await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name, phone:req.body.phone, isGold:req.body.isGold},{new:true})
    res.send(result);
});

router.delete('/:id', async (req,res)=>{
    // const result = await Customer.findByIdAndRemove(req.params.id);
    const result = await Customer.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).error(new Error('The customer with the given id not found!!'));
    res.send(result);
});





module.exports.R=router; 
module.exports.Customer=Customer

