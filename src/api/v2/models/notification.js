const mongoose = require('mongoose');
const {Schema} = mongoose;
const {model} = mongoose;

const notificationSchema = new Schema({
    title : {
        type : String ,
        minlength : 3 ,
        maxlength : 50 ,
        required : true
    },
    msg : {
        type : String ,
        minlength : 3 ,
        maxlength : 50 ,
        required : true
    }
},{timestamps:true})
const notificationTokenSchema = new Schema({
    token : {
        type : String ,
        required : true
    }
},{timestamps :true})
const NotificationToken = model('NotificationToken',notificationTokenSchema);
const Notification = model('Notification',notificationSchema);
module.exports={Notification,NotificationToken};
