// const asyncMiddleware = require("../middleware/async");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const objectID = require('../index');


//define Schema
const Genres = mongoose.model('Genres', new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:44
    }
}));

router.get('/:id',  async (req,res)=>{
    const genre = await Genres.findById(req.params.id);
    if (!genre) {
        res.status(404).send("The genre with the given id was not found...")
    }
    res.send(genre);
});

router.post('/', auth, (async (req,res)=>{

    //First, auth will check if token is "valid". If so then will follow. If no token provided,access wil be denied. If token is invalid, "invalid token" will be shown.

    const {error} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    
    const duplicate = await Genres.findOne({name: req.body.name});
    if(duplicate) return res.status(400).send("This genre already exists...")

    let genre =new Genres( {name: req.body.name} );
    genre = await genre.save()
    res.send(genre);
}));

router.put('/:id', async (req,res)=>{
    const {error} = validateGenre(req.body)
    if(error) return res.status(400).send(error.message);


    const genre = await Genres.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})

    if (!genre) return res.status(404).send("The genre with the given id was not found...");


    res.send(genre);

});

router.delete('/:id',[auth,admin], async (req,res)=>{

    const genre = await Genres.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send("The genre with the given id was not found...");

    res.send(genre);
});


router.get('/', ( async (req,res)=>{

    throw new Error('Could not get the genres at all..');

    const genres = await Genres.find()
    res.send(genres);

}));

function validateGenre(genre){
    const schema ={
        name: Joi.string().min(3).required(),
    }
   return Joi.validate(genre,schema)  
}





module.exports.genres=router; 
module.exports.Genres=Genres;



