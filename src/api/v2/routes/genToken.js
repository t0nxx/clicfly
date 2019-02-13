const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const router = express.Router();

let token = jwt.sign({id : 1 } , process.env.JWT_SECRET_USER);
router.get('/',(req,res)=>{
    res.send(token);
});

exports.TokenerRouter=router;