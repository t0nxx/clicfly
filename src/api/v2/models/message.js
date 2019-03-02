const mongoose = require('mongoose');
const {Schema} = mongoose;
const {model} = mongoose;

const MessageSchema = new Schema({
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
    },
    phone :{
        type : String ,
        minlength : 6 ,
        maxlength : 20 ,
        required   : true
    },
    subject : {
        type : String ,
        minlength : 3 ,
        maxlength : 255 ,
        required : true
    },
    message : {
        type : String ,
        minlength : 3 ,
        maxlength : 300 ,
        required : true
    },
})
const Message = model('Message',MessageSchema);
exports.Message = Message ;