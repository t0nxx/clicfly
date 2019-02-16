const FacebookTokenStrategy = require('passport-facebook-token');
const {facebookUser} = require('../models/user');

const faceAuthStrat = new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET
},async function(accessToken, refreshToken, profile,next){
    try {
    let isExist = await facebookUser.findOne({id : profile.id});
    if(!isExist){
            let isExist = new facebookUser({
                id : profile.id ,
                email : profile.emails[0].value
             });
             await isExist.save();
    }
    return next(null,isExist);
    } catch (error) {
        return next(error,false);
    }
});
exports.faceAuthStrat=faceAuthStrat;