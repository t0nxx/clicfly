const mongoose = require('mongoose');
const {User,Base,Exp , facebookUser , googleUser}= require('../models/user');
const {validIdObject}=require('../helpers/validateObjectId');
const {sendMail}=require('../helpers/sendMail');
const {genToken}=require('../helpers/genToken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const CircularJSON = require('circular-json');
require('dotenv').config();

/* get all Users handler */ 
const getAllUsers = async (req,res)=>{
    try {
        const result = await Base.find({}).populate('resetCode');
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
            name ,
            email ,
            password,
            gender ,  
    });
    const chkexist = await User.findOne({'email' : email});
    if(chkexist) throw new Error('email already exist');
    await user.save();

    let crypted_string = `JR4102pXLPMkRXIlK0$$$${user.password}$$$GazjO3hHJ0qHqtFYc`;
    let crypted_code = crypto.AES.encrypt(CircularJSON.stringify(crypted_string),process.env.CRYPTO_SECRET);
    res.status(200).json({
        'token':genToken({
            _id :user._id ,
            email : user.email ,
            xxx : crypted_code.toString()
        }),
        'data' : {
            _id :user._id,
            useType : user.useType ,
            name : user.name ,
            email : user.email ,
            gender : user.gender ,
    }}); 
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* update User */ 
const updateUser = async (req,res)=>{
    try {
        /* if user is facebook user */
        if(req.user.useType == "FacebookUser"){
                const updatedData = req.body ;
            if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
            const result = await facebookUser.findById(req.user._id);
            if(!result) throw new Error("no User was found");

            // if(req.body.email){
            //     const chkexist = await facebookUser.findOne({'email' : req.body.email});
            //     if(chkexist) throw new Error('email already exist');
            // }
            await facebookUser.findByIdAndUpdate(req.user._id,updatedData,{upsert : true});
            res.status(200).send({message:"User update done"});
        } else if (req.user.useType == "GoogleUser"){
            /*if user is google user */
                const updatedData = req.body ;
            if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
            const result = await googleUser.findById(req.user._id);
            if(!result) throw new Error("no User was found");

            // if(req.body.email){
            //     const chkexist = await googleUser.findOne({'email' : req.body.email});
            //     if(chkexist) throw new Error('email already exist');
            // }
            await googleUser.findByIdAndUpdate(req.user._id,updatedData,{upsert : true});
            res.status(200).send({message:"User update done"});
        } else{
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
        }
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
        if(!updatedData.currentPassword)throw new Error ("current password can't be empty");
        const result = await User.findById(req.user._id);
        if(!result) throw new Error("no User was found");

        const isMatch = await result.comPassword(updatedData.currentPassword);
        if(!isMatch ) throw new Error("current password is wrong");

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
        if(!chkexist) throw new Error("sorry email not register");
        if(chkexist) {
            let ex = new Exp({
                code : Math.floor(100000 + Math.random() * 900000)
            });
            await ex.save();
            //let code = Math.floor(100000 + Math.random() * 900000) ; 
                await User.findOneAndUpdate({'email' : chkexist.email},{resetCode : ex._id});
                sendMail(req.body.email,ex.code);
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
        const chkexist = await User.findOne({'email' : req.body.email}).populate('resetCode');
        if(chkexist) {
            if (!chkexist.resetCode ||req.body.resetCode != chkexist.resetCode.code)
                throw new Error ('invalid reset code');
        }
        else throw new Error ('invalid reset code');
        res.status(200).send({message: "correct code"});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

/* Change password */ 
const changePasswordAfterResetode = async (req,res)=>{
    try {
        const {password,email,resetCode} = req.body ;
        if(!password)throw new Error ("no password provided");
        if(!email)throw new Error ("no email provided");
        if(!password)throw new Error ("no resetCode provided");

        const result = await User.findOne({'email' : email}).populate('resetCode');
        if(!result) throw new Error("sorry email not register");

        if (!result.resetCode ||resetCode != result.resetCode.code){
            throw new Error ('invalid reset code');
        }

        if(password.length < 6){
            throw new Error ("password length must be not less than 6");
        }

        let newPass = await bcrypt.hashSync(password,10);
        await User.findByIdAndUpdate(result._id,{password:newPass})

        res.status(200).send({message:"Done password changed"});
    } catch (error) {
        res.status(400).send({message:error.message});
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
exports.changePasswordAfterResetode=changePasswordAfterResetode;