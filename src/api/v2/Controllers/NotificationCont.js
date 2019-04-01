const {Notification,NotificationToken} = require('../models/notification');
const {sendNotification,subscribeTopic,unSubscribeTopic}= require('../config/FireBase');

const addToken = async(req,res)=>{
    try {
        if (!req.body.token) throw new Error('no token provided');
    await subscribeTopic(req.body.token);
    let tok = new NotificationToken({
        token : req.body.token
    }) ;
    await tok.save();
    res.send({message:'token added done'})
    } catch (error) {
        res.send({message:error.message});
    }
}

const addNotification = async(req,res)=>{
    try {
        const {title,msg} = req.body;
        if(!title || ! msg) throw new Error ('title and msg are requird');
    const noti = new Notification({
        title ,
        msg,
    });
    await noti.save();
    const message = {
        notification: {
         title : noti.title,
         body : noti.msg ,
        },
        topic: 'marketing'
      };
      sendNotification(message);
    res.send({message:'notification added done and pushed to users'});
    } catch (error) {
        res.send({message:error.message});
    }
}

const getAllTokens = async(req,res)=>{
    try {
        const result = await NotificationToken.find({});
        res.status(200).send({message:result});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const getAllNotifications = async(req,res)=>{
    try {
        const result = await Notification.find({});
        res.status(200).send({message:result});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

module.exports = {addToken,addNotification,getAllTokens,getAllNotifications};