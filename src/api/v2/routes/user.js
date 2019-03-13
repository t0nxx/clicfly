const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,addUser,updateUser,deleteUser,changePassword,forgetPassword,forgetPassCode,changePasswordAfterResetode,addExp} = require('../Controllers/UserCont');
const {UserAuth}= require('../middlewares/userAuth');

/*
* get all Users 
*/
router.get('/',getAllUsers);

/*
* get User
*/
router.get('/:id',getOneUser);
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
router.put('/update',UserAuth,updateUser);
/*
* delete User
*/
router.delete('/:id',deleteUser);
/*
* change password
*/  
router.put('/changepassword',UserAuth,changePassword);
///forget password

exports.UserRouter=router;