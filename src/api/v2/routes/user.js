const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,addUser,updateUser,deleteUser,changePassword} = require('../Controllers/UserCont');
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