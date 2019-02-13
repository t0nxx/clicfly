const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,addUser,updateUser,deleteUser,changePassword} = require('../Controllers/UserCont');


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
router.put('/:id',updateUser);
/*
* delete User
*/
router.delete('/:id',deleteUser);
/*
* change password
*/
router.put('/:id/changepassword',changePassword);

exports.UserRouter=router;