const jwt = require('jsonwebtoken');
const {Admin} = require('../models/admin');
const crypto = require('crypto-js');
const path = require('path');
require('dotenv').config();
const AdminAuth = async(req,res,next)=>{
    if (!process.env.EnableAuth) return next(); // disable auth in dev
    const token = req.header("Authorization");
    if (!token) {return res.status(403).sendFile(path.join(__dirname , '../../../../403.html'));} 
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
                    throw new Error ('جلسة منتهية. برجاء اعادة تسجيل الدخول');
                }
                req.user = decode ;
            }
            else throw new Error('جلسة منتهية. برجاء اعادة تسجيل الدخول');
            next();
        } catch (error) {
            res.status(401).send({message :'جلسة منتهية. برجاء اعادة تسجيل الدخول'});
        }  
}
exports.AdminAuth=AdminAuth;
