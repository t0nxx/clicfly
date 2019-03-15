const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,addUser,updateUser,deleteUser,changePassword,forgetPassword,forgetPassCode,changePasswordAfterResetode,addExp} = require('../Controllers/UserCont');
const {UserAuth}= require('../middlewares/userAuth');
const {AdminAuth}= require('../middlewares/adminAuth');
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
router.post('/forgetpassword',forgetPassword);
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