const express = require('express');
const router = express.Router();
const {addToken,addNotification,getAllTokens,getAllNotifications} = require('../Controllers/NotificationCont');

/* retrive all notifications */
router.get('/',getAllNotifications);

/* retrive all tokens */
router.get('/tokens',getAllTokens);

/* add new notification */
router.post('/new',addNotification);

/* add new token */
router.post('/tokens/new',addToken);

exports.NotificationRouter=router;