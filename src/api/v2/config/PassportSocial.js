const passport = require('passport');
const {faceAuthStrat} = require('./FaceAuthConfig');
const {googAuthStrat} = require('./GoogAuthConfig');
const {genToken} = require('../helpers/genToken');
const {facebookUser,googleUser} = require('../models/user');
require('dotenv').config();

passport.use(faceAuthStrat);
passport.use(googAuthStrat);

const FacebookAuth = (req,res,next)=>{
    passport.authenticate('facebook-token',{session:false},async(err,data)=>{
        try {
            if(err || !data) throw new Error ('not signed account / invalid access token');
            else {
                let datafromDb = await facebookUser.findById(data.id);
                res.json({
                    token : genToken({_id :data.id , useType : "FacebookUser"}),
                    'data' : datafromDb});
            }
        } catch (error) {
            res.status(400).send({message : error.message});
        }
    })(req,res,next)       
};


const GoogleAuth = (req,res,next)=>{
    passport.authenticate('google-token',{session:false},async(err,data)=>{
        try {
            if(err || !data) console.log('no data')
            else {
                let datafromDb = await googleUser.findById(data.id);
                res.json({
                    token : genToken({_id : data.id , useType : "GoogleUser"}),
                    'data' : datafromDb});
            }
        } catch (error) {
            res.status(400).send({message : error.message});
        }
    })(req,res,next)       
};
exports.FacebookAuth = FacebookAuth;
exports.GoogleAuth = GoogleAuth;