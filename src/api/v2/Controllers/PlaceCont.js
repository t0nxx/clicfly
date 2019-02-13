const mongoose = require('mongoose');
const {Place}= require('../models/place');
const {validIdObject} = require('../helpers/validateObjectId');

/* get all Places handler */ 
const getAllPlaces = async (req,res)=>{
    try {
        const result = await Place.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* get one Place handler */
const getOnePlace = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Place.findById(req.params.id);
      if(!result) throw new Error("no Place was found");
      res.status(200).send(result); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add new Place */ 

const addPlace = async(req,res)=>{
    try {
    const {name} = req.body ;
    const place = new Place({
        name ,
    });
    await place.save();
    res.send("Place added ");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* update Place */ 
const updatePlace = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await Place.findById(req.params.id);
        if(!result) throw new Error("no Place was found");
        await Place.findByIdAndUpdate({_id:req.params.id},updatedData);
        res.status(200).send("Place update done");
    } catch (error) {
        res.status(400).send(error.message);
    }
}
/* delete Place */
const deletePlace = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const result = await Place.findById(req.params.id);
        if(!result) throw new Error("no Place was found");
        await Place.findByIdAndRemove(req.params.id);
        res.status(200).send("Place deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllPlaces=getAllPlaces;
exports.getOnePlace=getOnePlace;
exports.addPlace=addPlace;
exports.updatePlace=updatePlace;
exports.deletePlace=deletePlace;