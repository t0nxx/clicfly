const express = require('express');
const router = express.Router();
const {EmailLogin,AdminlLogin} = require('../Controllers/AuthCont');
const {FacebookAuth,GoogleAuth} = require('../config/PassportSocial')

router.post('/email',EmailLogin);
router.post('/admin',AdminlLogin);
router.post('/facebook' ,FacebookAuth);
router.post('/google',GoogleAuth);

exports.AuthRouter=router;