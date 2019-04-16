const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,addUser,updateUser,deleteUser,changePassword,forgetPassword,forgetPassCode,changePasswordAfterResetode,addExp} = require('../Controllers/UserCont');
const {UserAuth}= require('../middlewares/userAuth');
const {AdminAuth}= require('../middlewares/adminAuth');
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2 ,
    message:{message : "Too many requests created from this IP, please try again after an 15 min"}
  });
/*
* get all Users 
*/
router.get('/',AdminAuth,getAllUsers);   // require admin permission

/*
* get User
*/
router.get('/:id',AdminAuth,getOneUser); // require admin permission
/*
* add User
*/
router.post('/register',addUser);
/*
* forget password
*/
router.post('/forgetpassword',apiLimiter,forgetPassword);
/*
* reset code check
*/
router.post('/forgetpassword/resetcode',forgetPassCode);
/*
* reset code check
*/
router.post('/forgetpassword/resetcode/changepassword',changePasswordAfterResetode);
/*
* update User
*/
router.put('/update',UserAuth,updateUser); // require user permission
/*
* delete User
*/
router.delete('/:id',AdminAuth,deleteUser);   // require admin permission
/*
* change password
*/  
router.put('/changepassword',UserAuth,changePassword);   // require user permission
///forget password

exports.UserRouter=router;