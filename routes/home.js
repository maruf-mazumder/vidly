const express = require('express');
const router =express.Router();

router.get('/',(req,res)=>{
    res.send('Welcome Mr Maruf');
});

module.exports=router