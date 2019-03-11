const mongoose = require('mongoose');
const {User,Base}= require('../models/user');
const {validIdObject}=require('../helpers/validateObjectId');
const {sendMail}=require('../helpers/sendMail');
const {genToken}=require('../helpers/genToken');
const bcrypt = require('bcryptjs');

/* get all Users handler */ 
const getAllUsers = async (req,res)=>{
    try {
        const result = await Base.find({});
        res.status(200).send({message:result});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* get one User handler */
const getOneUser = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await User.findById(req.params.id);
      if(!result) throw new Error("no User was found");
      res.status(200).send({message:result}); 
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* add new User */ 

const addUser = async(req,res)=>{
    try {
    const {name , email , password , gender } = req.body ;
    const user = new User({
        method : 'local',
            name ,
            email ,
            password,
            gender   
    });
    const chkexist = await User.findOne({'email' : email});
    if(chkexist) throw new Error('email already exist');
    await user.save();
    res.status(200).send({'token':genToken({
        _id :user._id ,
        useType : user.useType ,
        name : user.name ,
        email : user.email ,
        gender : user.gender
      })});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* update User */ 
const updateUser = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.user._id);
        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await User.findById(req.user._id);
        if(!result) throw new Error("no User was found");

        if(req.body.email){
            const chkexist = await User.findOne({'email' : req.body.email});
            if(chkexist) throw new Error('email already exist');
        }
        await User.findByIdAndUpdate(req.user._id,updatedData,{upsert : true});
        res.status(200).send({message:"User update done"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
// it would be req.user._id after auth complete . up/dele

const deleteUser = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const result = await User.findById(req.params.id);
        if(!result) throw new Error("no User was found");
        await User.findByIdAndRemove(req.params.id);
        res.status(200).send({message:"User deleted"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* Change password */ 
const changePassword = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.user._id);
        const updatedData = req.body ;

        if(!updatedData.password)throw new Error ("no password enterd to change");
        const result = await User.findById(req.user._id);
        if(!result) throw new Error("no User was found");

        if(updatedData.password.length < 6){
            throw new Error ("password length not less than 6");
        }
        updatedData.password = await bcrypt.hashSync(updatedData.password,10);

        await User.findByIdAndUpdate({_id:req.user._id},updatedData);
        res.status(200).send({message:"Done password changed"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* forget password */ 
const forgetPassword = async (req,res)=>{
    try {
        if (!req.body.email) throw new Error('please enter your email');
        const chkexist = await User.findOne({'email' : req.body.email});
        if(chkexist) {
            let code = Math.floor(100000 + Math.random() * 900000) ; 
                await User.findOneAndUpdate({'email' : chkexist.email},{resetCode : code});
                sendMail(req.body.email,code);
        };
        res.status(200).send({message:"an email was sent if you are already register"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* forget password */ 
const forgetPassCode = async (req,res)=>{
    try {
        if (!req.body.email) throw new Error('please enter your email');
        if (!req.body.resetCode) throw new Error('please enter reset code');
        const chkexist = await User.findOne({'email' : req.body.email});
        if(chkexist) {
            if (req.body.resetCode != chkexist.resetCode)
                throw new Error ('invalid reset code');
        }
        else throw new Error ('invalid reset code');
        res.status(200).send({message: "correct code"});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}


exports.getAllUsers=getAllUsers;
exports.getOneUser=getOneUser;
exports.addUser=addUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;
exports.changePassword=changePassword;
exports.forgetPassword=forgetPassword;
exports.forgetPassCode=forgetPassCode;