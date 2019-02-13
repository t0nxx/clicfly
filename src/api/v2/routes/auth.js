const express = require('express');
const router = express.Router();
const {EmailLogin} = require('../Controllers/AuthCont')

router.post('/email',EmailLogin);

exports.AuthRouter=router;