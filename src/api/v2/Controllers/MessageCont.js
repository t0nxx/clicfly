const {Message}= require('../models/message.js');

/* get messages handler */ 
const getMessages = async (req,res)=>{
    try {
        const result = await Message.find({});
        res.status(200).send({message:result});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
/* add new message */ 

const addMessage = async(req,res)=>{
    try {
    const {name , email , phone , subject , message } = req.body ;
    const mess = new Message({
            name ,
            email ,
            phone , 
            subject , 
            message 
    });
    await mess.save();
    res.status(200).send({message:"message sent successfully "});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

module.exports = {getMessages , addMessage};