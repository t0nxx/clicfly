const {AboutUs}= require('../models/aboutUs.js');
const {validIdObject} = require('../helpers/validateObjectId');

/* get aboutUs handler */ 
const getAbout = async (req,res)=>{
    try {
        const result = await AboutUs.find({});
        res.status(200).send({message:result[0]});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* update aboutUs */ 
const updateAbout = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await AboutUs.findById(req.params.id);
        if(!result) throw new Error("no data was found");
        await AboutUs.findByIdAndUpdate({_id:req.params.id},updatedData);
        res.status(200).send({message:"About Us update done"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
module.exports = {getAbout , updateAbout};