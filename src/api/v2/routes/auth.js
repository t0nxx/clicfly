const express = require('express');
const router = express.Router();
const {EmailLogin,FacebookLogin,GoogleLogin} = require('../Controllers/AuthCont')

router.post('/email',EmailLogin);
router.post('/facebook',FacebookLogin);
router.post('/google',GoogleLogin);

exports.AuthRouter=router;