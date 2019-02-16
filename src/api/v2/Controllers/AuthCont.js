const {User} = require('../models/user')
const {genToken} = require('../helpers/genToken');
require('dotenv').config();

const EmailLogin = async(req,res)=>{
    try {
        if(! req.body.email || ! req.body.password ) 
            throw new Error("must enter email / password");

      const user = await User.findOne({email : req.body.email});
      if(!user) throw new Error("invalid email / password");

      if(!req.body.password) throw new Error("no password provided");
      const isMatch = await user.comPassword(req.body.password);
      if(!isMatch ) throw new Error("invalid user / password");

      res.status(200).json({'token':genToken(user._id)}); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.EmailLogin=EmailLogin;