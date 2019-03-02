const jwt = require('jsonwebtoken');
require('dotenv').config();
const genToken = (data) => {
    let token = jwt.sign(data , process.env.JWT_SECRET);
    return token ;
}
exports.genToken = genToken ;