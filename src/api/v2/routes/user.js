const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,addUser,updateUser,deleteUser,changePassword,forgetPassword} = require('../Controllers/UserCont');
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
* add User
*/
router.post('/forgetpassword',forgetPassword);
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