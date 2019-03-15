const jwt = require('jsonwebtoken');
const {Admin} = require('../models/admin');
const crypto = require('crypto-js');
require('dotenv').config();
const AdminAuth = async(req,res,next)=>{
    if (!process.env.EnableAuth) return next(); // disable auth in dev
    const token = req.header("Authorization");
    if (!token) {return res.status(401).send({message :"access denied no token"});} 
    else if (token === process.env.MASTER_SECRET){ next();}  /// master key for all
    else try {
            const decode = await jwt.verify(token,process.env.JWT_SECRET_ADMIN);
            if(decode){
                let {xxx} = decode;
                if(!xxx) throw new Error ('invalid token');
                /// decrypt the pass with random string
                let temp = crypto.AES.decrypt(xxx.toString(),process.env.CRYPTO_SECRET);
                xxx = JSON.parse( temp.toString(crypto.enc.Utf8));

                let splited = xxx.split('$$$');
                let pass = splited[1];
                let admin = await Admin.findById(decode._id);
                if(!admin || pass != admin.password){
                    throw new Error ('expired token please login again');
                }
                req.user = decode ;
            }
            else throw new Error('invalid token');
            next();
        } catch (error) {
            res.status(400).send({message :'invalid / expired token please login again'});
        }  
}
exports.AdminAuth=AdminAuth;
