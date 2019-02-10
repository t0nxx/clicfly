const mongoose = require('mongoose');
const {Offer}= require('../models/offer');
const {User}= require('../models/user');
const {validIdObject}=require('../helpers/validateObjectId');

/* get all Offers handler */ 
const getAllOffers = async (req,res)=>{
    try {
        const result = await Offer.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* get one Offer handler */
const getOneOffer = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Offer.findById(req.params.id);
      if(!result) throw new Error("no Offer was found");
      res.status(200).send(result); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/* add new Offer */ 

const addOffer = async(req,res)=>{
    try {
    const {title , description , photo , price , place , dateFrom , dateTo , stores} = req.body ;
    const offer = new Offer({
        title , 
        description , 
        photo , 
        price , 
        place , 
        dateFrom , 
        dateTo , 
        stores
    });
    await offer.save();
    res.send("Offer added ");
    } catch (error) {
        res.status(400).send(error.message);
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
        res.status(200).send("Offer update done");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteOffer = async(req,res)=>{
    try {
        /* validate id is mongo objectType */
        validIdObject(req.params.id);

        const result = await Offer.findById(req.params.id);
        if(!result) throw new Error("no Offer was found");
        await Offer.findByIdAndRemove(req.params.id);
        res.status(200).send("Offer deleted");
    } catch (error) {
        res.status(400).send(error.message);
    }
}
/* add offer to fav */ 
const addOfferToFav = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Offer.findById(req.params.id);
      if(!result) throw new Error("no Offer was found");
      const likedComp = {'$push' : {'favoriteOffers' : req.params.id}};
      const user = await User.findByIdAndUpdate("5c605aae402629201d8504e3",likedComp,{new : true, upsert : true}) ;
      // req.user._id after auth complete
      res.status(200).send('added to favorite'); 
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllOffers=getAllOffers;
exports.getOneOffer=getOneOffer;
exports.addOffer=addOffer;
exports.updateOffer=updateOffer;
exports.deleteOffer=deleteOffer;
exports.addOfferToFav=addOfferToFav;
