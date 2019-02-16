const passport = require('passport');
const {faceAuthStrat} = require('./FaceAuthConfig');
const {googAuthStrat} = require('./GoogAuthConfig');
const {genToken} = require('../helpers/genToken');
require('dotenv').config();

passport.use(faceAuthStrat);
passport.use(googAuthStrat);

const FacebookAuth = (req,res,next)=>{
    passport.authenticate('facebook-token',{session:false},(err,data)=>{
        try {
            if(err) throw new Error ('not signed account / invalid access token')
            else {
                res.json({token : genToken(data.id)});
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    })(req,res,next)       
};


const GoogleAuth = (req,res,next)=>{
    passport.authenticate('google-token',{session:false},(err,data)=>{
        try {
            if(err) throw new Error ('not signed account / invalid access token')
            else {
                res.json({token : genToken(data.id)});
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    })(req,res,next)       
};
exports.FacebookAuth = FacebookAuth;
exports.GoogleAuth = GoogleAuth;