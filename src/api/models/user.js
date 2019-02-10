const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const ObjectId = Schema.Types.ObjectId ;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 255 ,
    },
    email : {
        type : String ,
        required : true,
        minlength : 6 ,
        maxlength : 255 ,
    },
    password :{
        type : String ,
        required : true ,
        minlength : 6 ,
        maxlength : 255 ,
    },
    gender : {
        type : String ,
        enum : ['male' , 'female'],
        required : true
    },
    address : {
        type : String ,
        required : true
    },
    birthday : {
        type : String ,
        required : true 
    },
    favoriteCompanies : {
    type : [{type:ObjectId,ref :'Comapny'}],
    },
    favoriteOffers : {
        type : [{type:ObjectId,ref :'Offer'}],
    },
    resetCode : {
        type : String ,
        default : ""
    },
},{timestamps:true});
userSchema.pre('save',async function(){    
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hashSync(this.password,10);
    }
})
/// add  forgetPassword method here
const User = model('User',userSchema);


exports.User=User;
