const mongoose = require('mongoose');
const {Admin}= require('../models/admin');
const {validIdObject}=require('../helpers/validateObjectId');
const {genTokenAdmin}=require('../helpers/genToken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const CircularJSON = require('circular-json');
require('dotenv').config();

/* get all Admins handler */ 
const getAllAdmins = async (req,res)=>{
    try {
        const result = await Admin.find({});
        res.status(200).send({message:result[0]});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
/* update Admin */ 
const updateAdmin = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        if(!req.user) throw new Error('access denied');
        validIdObject(req.user._id);

        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("لم يتم ادخال بيانات لتحديثها");
        const result = await Admin.findById(req.user._id);
        if(!result) throw new Error("no Admin was found");
        /* check if new pass cause mongoose pre update is fkin sh*t */
        if (updatedData.password) {
            if(updatedData.password.length < 6){
                throw new Error ("password length not less than 6");
            }
           updatedData.password = await bcrypt.hashSync(updatedData.password,10);
        }
        ////////
        let admin = await Admin.findByIdAndUpdate({_id:req.user._id},updatedData,{runValidators : true , new : true});

        let crypted_string = `JR4102pXLPMkRXIlK0$$$${admin.password}$$$GazjO3hHJ0qHqtFYc`;
        let crypted_code = crypto.AES.encrypt(CircularJSON.stringify(crypted_string),process.env.CRYPTO_SECRET);

        res.status(200).send({
            message:"تم تحديث البيانات بنجاح",
            'newToken':genTokenAdmin({
                _id :admin._id ,
                email : admin.email ,
                xxx : crypted_code.toString()
              })
            });
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
exports.getAllAdmins=getAllAdmins;
exports.updateAdmin=updateAdmin;