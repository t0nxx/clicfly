const express = require('express');
const router = express.Router();
const {getMessages,addMessage} = require('../Controllers/MessageCont');
const {AdminAuth}= require('../middlewares/adminAuth');

/*
* get messages
*/
router.get('/',AdminAuth,getMessages);   // require admin permission

/*
* add new messages
*/
router.post('/new',addMessage);

exports.MessagesRouter=router;