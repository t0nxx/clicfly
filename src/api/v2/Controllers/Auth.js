const {User} = require('../models/user')
const {validIdObject} = require('../helpers/validateObjectId');
const jwt = require('jsonwebtoken');

const EmailLogin = async(req,res)=>{
    try {
        if(! req.body.id || ! req.body.id ) 
            throw new Error("all fields are required");
       /* validate id is mongo objectType */
        validIdObject(req.body.id);

      const user = await User.findById(req.body.id);
      if(!user) throw new Error("invalid user / password");

      if(!req.body.password) throw new Error("no password provided");
      const isMatch = await user.comPassword(req.body.password);
      if(!isMatch ) throw new Error("invalid user / password");

      const token = await jwt.sign(req.body.id,'testauth');
    
      res.setHeader('Authorization',token);
      res.status(200).json("ok auth"); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.EmailLogin=EmailLogin;