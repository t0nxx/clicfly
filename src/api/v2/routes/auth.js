const express = require('express');
const router = express.Router();
const {EmailLogin,GoogleLogin} = require('../Controllers/AuthCont');
const {FacebookAuth} = require('../config/PassportSocial')

router.post('/email',EmailLogin);
router.post('/facebook' ,FacebookAuth);
router.post('/google',GoogleLogin);

exports.AuthRouter=router;