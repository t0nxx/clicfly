const express = require('express');
const router = express.Router();
const {getAbout,updateAbout} = require('../Controllers/AboutUsCont');

/*
* get about us
*/
router.get('/',getAbout);

/*
* update about Us 
*/
router.put('/:id',updateAbout);

exports.AboutUsRouter=router;