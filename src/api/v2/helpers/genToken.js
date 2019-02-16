const jwt = require('jsonwebtoken');
require('dotenv').config();
const genToken = (id) => {
    let token = jwt.sign({_id : id} , process.env.JWT_SECRET);
    return token ;
}
exports.genToken = genToken ;