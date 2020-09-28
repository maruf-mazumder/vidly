const {User, validate}=require('../models/user');
const auth =require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const Joi =require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const error = require('../middleware/error');
const router = express.Router();

router.get('/me',auth, async (req,res)=>{
    const user =  await User.findById({_id : req.user._id}).select("-password")
    console.log("reached...")
    res.send(user);
    console.log(user);
})

router.get('/', async (req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(ex){
      next(error);
    }
})

router.post('/', async (req,res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User already exist...");

    user= new User(_.pick(req.body,['name','email','password']));

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password,salt);

    await user.save()

    const token = user.generateAuthToken();

    res.header("x-auth-token", token).send(_.pick(user,['_id','name','email']));
});

module.exports=router