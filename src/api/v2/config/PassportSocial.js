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
            if(err || !data) throw new Error ('not signed account / invalid access token')
            else {
                console.log(data);
                res.json({token : genToken({_id :data.id})});
            }
        } catch (error) {
            res.status(400).send({message : error.message});
        }
    })(req,res,next)       
};


const GoogleAuth = (req,res,next)=>{
    passport.authenticate('google-token',{session:false},(data)=>{
        try {
            if(!data) throw new Error ('not signed account / invalid access token')
            else {
                console.log(data);
                res.json({token : genToken({_id : data.id})});
            }
        } catch (error) {
            res.status(400).send({message : error.message});
        }
    })(req,res,next)       
};
exports.FacebookAuth = FacebookAuth;
exports.GoogleAuth = GoogleAuth;