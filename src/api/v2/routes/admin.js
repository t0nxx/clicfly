const express = require('express');
const router = express.Router();
const {getAllAdmins,updateAdmin} = require('../Controllers/AdminCont');
const {AdminAuth}= require('../middlewares/adminAuth');


/*
* get all Admins 
*/
router.get('/',AdminAuth,getAllAdmins);
/*
* update Admin
*/
router.put('/update',AdminAuth,updateAdmin);


exports.AdminRouter=router;