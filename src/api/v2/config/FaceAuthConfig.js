const FacebookTokenStrategy = require('passport-facebook-token');
const {facebookUser} = require('../models/user');

const faceAuthStrat = new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET ,
    profileFields : ['id', 'email', 'gender','displayName']
},async function(accessToken, refreshToken, profile,next){
    try {
    let isExist = await facebookUser.findOne({_id : profile.id});
    if(!isExist){
            let isExist = new facebookUser({
                _id : profile.id ,
                email : profile.emails[0].value ,
                name : profile.displayName,
                gender : profile.gender
             });
             await isExist.save();
    }
    return next(null,isExist);
    } catch (error) {
        return next(error,false);
    }
});
exports.faceAuthStrat=faceAuthStrat;