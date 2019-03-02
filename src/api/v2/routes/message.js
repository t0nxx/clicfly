const express = require('express');
const router = express.Router();
const {getMessages,addMessage} = require('../Controllers/MessageCont');

/*
* get messages
*/
router.get('/',getMessages);

/*
* add new messages
*/
router.post('/new',addMessage);

exports.MessagesRouter=router;