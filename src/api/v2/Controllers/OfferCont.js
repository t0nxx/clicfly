const mongoose = require('mongoose');
const {Offer}= require('../models/offer');
const {validIdObject}=require('../helpers/validateObjectId');
const {makePath}=require('../helpers/photoPath');

/* get all Offers handler */ 
const getAllOffers = async (req,res)=>{
    let page = parseInt(req.query.page) || 0 ;
    let limit = parseInt(req.query.limit) || 10;
    try {
        const result = await Offer.find({}).skip(page * limit).limit(limit).populate('companyName','name phone');
        // to retrive base url from db 
        result.forEach(offer => {
            offer.homePhoto = offer.homePhoto ;
            offer.singlePhoto = offer.singlePhoto;
        })
        res.status(200).send({message:result});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* get one Offer handler */
const getOneOffer = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Offer.findById(req.params.id).populate('companyName','name phone');
      if(!result) throw new Error("no Offer was found");
      result.homePhoto = result.homePhoto ;
      result.singlePhoto = result.singlePhoto
      res.status(200).send({message:result}); 
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* add new Offer */ 

const addOffer = async(req,res)=>{
    try {
    const {category , price , place , dateFrom , dateTo , companyName , special , includesTickets , includeAccommodation} = req.body ;
    if(!req.files) throw new Error ('No photos selected');
    if(!req.files.homePhoto || !req.files.singlePhoto) throw new Error ('Home / single photos are required');
    let {singlePhoto,homePhoto} = req.files ;
    /// add validate mimetype
    const offer = new Offer({
        category , 
        price , 
        place , 
        dateFrom , 
        dateTo , 
        companyName ,
        special ,
        includesTickets ,
        includeAccommodation ,
        homePhoto: makePath(homePhoto),
        singlePhoto: makePath(singlePhoto)
    });
    await offer.save();
    res.send({message:"Offer added "});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* update Offer */ 
const updateOffer = async (req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const updatedData = req.body ;
        if(Object.keys(updatedData).length < 1 )throw new Error ("no data to update");
        const result = await Offer.findById(req.params.id);
        if(!result) throw new Error("no Offer was found");
        await Offer.findByIdAndUpdate({_id:req.params.id},updatedData);
        res.status(200).send({message:"Offer update done"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

const deleteOffer = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const result = await Offer.findById(req.params.id);
        if(!result) throw new Error("no Offer was found");
        await Offer.findByIdAndRemove(req.params.id);
        res.status(200).send({message:"Offer deleted"});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
/* search */
const search = async (req,res)=>{
    let {q} = req.query ;
    try {
        // full and partial search
        Offer.search({query_string: {query: `*${q}*`}},(err, results)=>{
                res.status(200).send({message:results.hits.hits});
          });
        
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
exports.getAllOffers=getAllOffers;
exports.getOneOffer=getOneOffer;
exports.addOffer=addOffer;
exports.updateOffer=updateOffer;
exports.deleteOffer=deleteOffer;
exports.search=search;