const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const bcrypt = require('bcryptjs');
const adminSchema = new Schema({
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
    }
},{timestamps:true});
adminSchema.pre('save',async function(){    
    if(this.password && this.isModified('password')){
        this.password = await bcrypt.hashSync(this.password,10);
    }
    
})

const Admin = model('Admin',adminSchema);
exports.Admin=Admin;