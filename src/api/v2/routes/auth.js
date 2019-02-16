const express = require('express');
const router = express.Router();
const {EmailLogin,GoogleLogin} = require('../Controllers/AuthCont');
const {FacebookAuth,GoogleAuth} = require('../config/PassportSocial')

router.post('/email',EmailLogin);
router.post('/facebook' ,FacebookAuth);
router.post('/google',GoogleAuth);

exports.AuthRouter=router;