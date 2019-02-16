const GoogleTokenStrategy = require('passport-google-token').Strategy;
const {googleUser} = require('../models/user');

const googAuthStrat = new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_APP_ID,
    clientSecret: process.env.GOOGLE_APP_SECRET
},async function(accessToken, refreshToken, profile,next){
    try {
    let isExist = await googleUser.findOne({_id : profile.id});
    if(!isExist){
            let isExist = new googleUser({
                _id : profile.id ,
                email : profile.emails[0].value
             });
             await isExist.save();
    }
    return next(null,isExist);
    } catch (error) {
        return next(error,false);
    }
});
exports.googAuthStrat=googAuthStrat;