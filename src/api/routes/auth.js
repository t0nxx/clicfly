const express = require('express');
const router = express.Router();
const {EmailLogin} = require('../Controllers/Auth')

router.post('/email',EmailLogin);

exports.AuthRouter=router;