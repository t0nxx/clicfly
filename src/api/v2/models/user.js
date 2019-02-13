const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const bcrypt = require('bcryptjs');
//// pull local content to global schema
const userSchema = new Schema({
    method : {
        type : String ,
        enum : ['local','facebook','google'],
        required : true
    },
    local : {
        name : {
            type : String ,
            minlength : 3 ,
            maxlength : 255 ,
        },
        email : {
            type : String ,
            minlength : 6 ,
            maxlength : 255 ,
        },
        password :{
            type : String ,
            minlength : 6 ,
            maxlength : 255 ,
        },
        gender : {
            type : String ,
            enum : ['male' , 'female'],
        },
        resetCode : {
            type : String ,
            default : ""
        }
    },
    facebook : {
        id : String ,
        email :String
    },
    google : {
        id : String ,
        email :String
    }
},{timestamps:true});
userSchema.pre('save',async function(next){    
    try {
        if(this.method != 'local') next();

        if(this.local.password && this.isModified('local.password')){
            this.local.password = await bcrypt.hashSync(this.local.password,10);
        }
    } catch (error) {
        console.log(error.message);
    }
    
})
userSchema.methods.comPassword = async function (pass){
        return bcrypt.compare(pass,this.password)     
}
/// add  forgetPassword method here
const User = model('User',userSchema);


exports.User=User;
