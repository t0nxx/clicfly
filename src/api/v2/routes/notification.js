const express = require('express');
const router = express.Router();
const {addToken,addNotification,getAllTokens,getAllNotifications} = require('../Controllers/NotificationCont');
const {AdminAuth}= require('../middlewares/adminAuth');

/* retrive all notifications */
router.get('/',AdminAuth,getAllNotifications);   // require admin permission

/* retrive all tokens */
router.get('/tokens',AdminAuth,getAllTokens);   // require admin permission

/* add new notification */
router.post('/new',AdminAuth,addNotification);   // require admin permission

/* add new token */
router.post('/tokens/new',addToken);

exports.NotificationRouter=router;