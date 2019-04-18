const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const bcrypt = require('bcryptjs');

/* start base schema */
const baseSchema = new Schema ({},
    {discriminatorKey: 'useType' ,collection : 'user' ,timestamps:true}); 
    /* base collection , idea here to make one collection 'user'
    contains different schema type independantlly face/google/email .. */ 
const Base = model('Base',baseSchema);
/* end base Schema && model */
const expiration_schema = new Schema({
    createdAt : {
        type: Date,
        default: Date.now,
        index : {expires : 60*5}
    },
    code : {
        type : String ,
        default : ""
    }
})
/* start login with email schema */
const emailUserSchema = new Schema({
    name : {
        type : String ,
        minlength : 3 ,
        maxlength : 255 ,
        required : true
    },
    email : {
        type : String ,
        minlength : 6 ,
        maxlength : 255 ,
        required : true ,
        unique : true
    },
    password :{
        type : String ,
        minlength : 6 ,
        maxlength : 255 ,
        required   : true
    },
    gender : {
        type : String ,
        enum : ['male' , 'female'],
        required : true
    },
    resetCode : {
        type : mongoose.Types.ObjectId,
        ref :'Exp'
    }
    
});

emailUserSchema.pre('save',async function(){    
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hashSync(this.password,10);
    }
})
emailUserSchema.methods.comPassword = async function (pass){
        return bcrypt.compare(pass,this.password)     
}
emailUserSchema.methods.forgetPassword = async function (email){
    /// logic herer to send reset code with mailler
}
/* end login with email schema */

/* start login with facebook schema */
emailUserSchema.index({resetCode : 1} , {expires : 60})

const facebookUserSchema = new Schema({
    _id : {
        type : String ,
        required : true ,
    } ,
    email : {
        type : String ,
        default : 'no email'
    },
    name : {
        type : String ,
        required : true ,
    },
    gender : {
        type : String ,
        default : "private gender"
    }
})

/* end login with facebook schema */

/* start login with google schema */

const googleUserSchema = new Schema({
    _id : {
        type : String ,
        required : true 
    } ,
    email : {
        type : String ,
        default : 'no email'
    },
    name : {
        type : String ,
        required : true ,
    } ,
    gender : {
        type : String ,
        default : "private gender"
    }
})

/* end login with google schema */


/* start models discrimantors 'inherte from base'  */

const User = Base.discriminator('EmailUser',emailUserSchema);
const facebookUser = Base.discriminator('FacebookUser',facebookUserSchema);
const googleUser = Base.discriminator('GoogleUser',googleUserSchema);
/* end models inhertance */
const Exp = model('Exp',expiration_schema);

exports.User=User;
exports.facebookUser = facebookUser ;
exports.googleUser = googleUser ;
exports.Base=Base;
exports.Exp = Exp ;
