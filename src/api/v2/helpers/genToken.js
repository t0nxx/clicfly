const jwt = require('jsonwebtoken');
require('dotenv').config();
const genToken = (data) => {
    let token = jwt.sign(data , process.env.JWT_SECRET,{expiresIn : '30d'});
    return token ;
}
exports.genToken = genToken ;