const {User} = require('../models/user');
const {Admin} = require('../models/admin');
const {genToken,genTokenAdmin} = require('../helpers/genToken');
const crypto = require('crypto-js');
const CircularJSON = require('circular-json');
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
        /// encrypt the pass with random string
      let crypted_string = `JR4102pXLPMkRXIlK0$$$${user.password}$$$GazjO3hHJ0qHqtFYc`;
      let crypted_code = crypto.AES.encrypt(CircularJSON.stringify(crypted_string),process.env.CRYPTO_SECRET);

      res.status(200).json({
        'token':genToken({
            _id :user._id ,
            email : user.email ,
            xxx : crypted_code.toString()
        }),
        'data' : {
            _id :user._id,
            useType : user.useType ,
            name : user.name ,
            email : user.email ,
            gender : user.gender ,
    }}); 
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const AdminlLogin = async(req,res)=>{
    try {
        if(! req.body.email || ! req.body.password ) 
            throw new Error("must enter email / password");

      const admin = await Admin.findOne({email : req.body.email});
      if(!admin) throw new Error("invalid email / password");

      if(!req.body.password) throw new Error("no password provided");
      const isMatch = await admin.comPassword(req.body.password);
      if(!isMatch ) throw new Error("invalid user / password");
        /// encrypt the pass with random string
      let crypted_string = `JR4102pXLPMkRXIlK0$$$${admin.password}$$$GazjO3hHJ0qHqtFYc`;
      let crypted_code = crypto.AES.encrypt(CircularJSON.stringify(crypted_string),process.env.CRYPTO_SECRET);

      res.status(200).json({'token':genTokenAdmin({
          _id :admin._id ,
          email : admin.email ,
          xxx : crypted_code.toString()
        }),
    'data' : {
        _id :admin._id ,
        name : admin.name,
        email : admin.email ,
    }}); 
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
exports.EmailLogin=EmailLogin;
exports.AdminlLogin = AdminlLogin ;