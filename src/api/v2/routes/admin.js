const express = require('express');
const router = express.Router();
const {getAllAdmins,updateAdmin} = require('../Controllers/AdminCont');


/*
* get all Admins 
*/
router.get('/',getAllAdmins);
/*
* update Admin
*/
router.put('/:id',updateAdmin);


exports.AdminRouter=router;