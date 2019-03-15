const express = require('express');
const router = express.Router();
const {getAbout,updateAbout} = require('../Controllers/AboutUsCont');
const {AdminAuth}= require('../middlewares/adminAuth');

/*
* get about us
*/
router.get('/',getAbout);

/*
* update about Us 
*/
router.put('/:id',AdminAuth,updateAbout);  // require admin permission

exports.AboutUsRouter=router;