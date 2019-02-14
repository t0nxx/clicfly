const {User,facebookUser,googleUser} = require('../models/user')
const jwt = require('jsonwebtoken');
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

      const token = await jwt.sign({_id : user._id},process.env.JWT_SECRET);
    
      res.status(200).json({'status' : 'email user auth ok' ,'token':token}); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add facebook user */ 
const FacebookLogin = async(req,res)=>{ 
    try {
    // access token from query or headers , verify ...etc
    // for dev it will by  req.query  , else use passport ,
    // profile.id email ..... from response 
    const {id , email} = req.query ;   // for dev
    const faceuser = new facebookUser({
       id,
       email
    });
    await faceuser.save();

    const token = await jwt.sign({_id : faceuser.id},process.env.JWT_SECRET);

    res.status(200).json({'status' : 'facbook user auth ok' ,'token':token}); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add google user */ 
const GoogleLogin = async(req,res)=>{ 
    try {
    // access token from query or headers , verify ...etc
    // for dev it will by  req.query  , else use passport ,
    // profile.id email ..... from response 
    const {id , email} = req.query ;   // for dev
    const gouser = new googleUser({
       id,
       email 
    });
    await gouser.save();
    
    const token = await jwt.sign({_id : gouser.id},process.env.JWT_SECRET);
    
    res.status(200).json({'status' : 'google user auth ok' ,'token':token});
    } catch (error) {
        res.status(400).send(error.message);
    }
}



exports.EmailLogin=EmailLogin;
exports.FacebookLogin=FacebookLogin;
exports.GoogleLogin=GoogleLogin;