const mongoose = require('mongoose');
const {Schema} = mongoose;
const {model} = mongoose;

const notificationSchema = new Schema({
    title : {
        type : String ,
        minlength : 3 ,
        maxlength : 20 ,
        required : true
    },
    msg : {
        type : String ,
        minlength : 3 ,
        maxlength : 50 ,
        required : true
    },
    icon : {
        type : String ,
        default : 'https://image.flaticon.com/icons/svg/1498/1498461.svg'
    }
},{timestamps:true})
const notificationTokenSchema = new Schema({
    token : {
        type : String ,
        required : true
    }
})
const NotificationToken = model('NotificationToken',notificationTokenSchema);
const Notification = model('Notification',notificationSchema);
module.exports={Notification,NotificationToken};