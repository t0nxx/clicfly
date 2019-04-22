const mongoose = require('mongoose');
const {Offer}= require('../models/offer');
const {Company}= require('../models/company');
const {validIdObject}=require('../helpers/validateObjectId');
const {makePath}=require('../helpers/photoPath');

/* get all Offers handler */ 
const getAllOffers = async (req,res)=>{
    let page = parseInt(req.query.page) || 0 ;
    let limit = parseInt(req.query.limit) || 5;
    try {
        let query = {};
        /// count #of offers
        // company / hotel / special 
        if(req.query.filter){
            if(req.query.filter == 'hotel')
                query.category = 'Hotel' ;
            else if(req.query.filter == 'company')
                query.category = 'Company' ;
            else if (req.query.filter == 'special')
                query.special = true ;
            else 
                query = {} ;
        }
        //dateFrom : {$gte :'2010-11-30T00:00:00.000Z' ,$lte :'2010-11-30T00:00:00.000Z'}
        const total = await Offer.find(query).count();
        const result = await Offer.find(query).skip(page * limit).limit(limit).populate('companyName','name phone').sort({createdAt : -1});
        let remaining = total - ( (page+1) * limit);
        // to retrive base url from db 
        // result.forEach(offer => {
        //     offer.homePhoto = offer.homePhoto ;
        //     offer.singlePhoto = offer.singlePhoto;
        // })
        remaining = remaining < 0 ? 0 : remaining ;
        res.status(200).send({message:result ,remaining, total});
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* get one Offer handler */
const getOneOffer = async(req,res)=>{
    try {
       /* validate id is mongo objectType */
        validIdObject(req.params.id);

      const result = await Offer.findById(req.params.id);
      if(!result) throw new Error("no Offer was found");
      res.status(200).send({message:result}); 
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}

/* add new Offer */ 

const addOffer = async(req,res)=>{
    try {
    const {category , price , place , startDate , endDate , companyName , special , includesTickets , includeAccommodation , vip} = req.body ;
    if(!req.files) throw new Error ('No photos selected');
    if(!req.files.homePhoto || !req.files.singlePhoto) throw new Error ('Home / single photos are required');
    //if(!req.body.startDate || !req.body.endDate) throw new Error ('startDate and endtDate are required');
    let {singlePhoto,homePhoto} = req.files ;
    /// add validate mimetype
    let offer = new Offer({
        category , 
        price , 
        place , 
        startDate , 
        endDate , 
        companyName ,
        special ,
        includesTickets ,
        includeAccommodation ,
        vip ,
        homePhoto: makePath(homePhoto),
        singlePhoto: makePath(singlePhoto)
    });
    
    let comName = await Company.findById(offer.companyName) ;
    if(!comName) throw new Error("no Company was found");
    offer.company = comName.name ;
    if(vip && vip == true || vip == "true"){
        let count = await Offer.count({vip : true});
        console.log(count);
    if(count >= 4 ) throw new Error ('vip offers must not exceed 4 , please remove one of them');
    }
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
        if(updatedData.vip && updatedData.vip == true || updatedData.vip == "true"){
            let count = await Offer.count({vip : true});
            console.log(count);
        if(count >= 4 ) throw new Error ('vip offers must not exceed 4 , please remove one of them');
        }
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
    let page = parseInt(req.query.page) || 0 ;
    let limit = parseInt(req.query.limit) || 5;
    let {q} = req.query ;
    try {
        // full and partial search
        let query = {}
        let n = new RegExp(`${q}`,'ig');
        console.log(n);
        /// here all magic :D B|
        // if(isFinite(q)) { // since parseint not enough . it won't check all q is number or not
        //  query = {range: {price:{from:0 , to: `${parseFloat(q)}`}}} ;
        // }
        // else {
        //  query = {query_string: {query: `*${q}*`}} ;
        // }

        // Offer.search({query_string: {query: `*${q}*`}},(err, results)=>{
        //     let arr = results.hits.hits ;
        //         res.status(200).send({message:arr.filter(v=>v)});
        //   });
        let total = await Offer.find({
            $or : [
                { place: { $regex: n } },
                { company: { $regex: n } }
            ]
        }).count() ;
        let rez = await Offer.find({
            $or : [
                { place: { $regex: n } },
                { company: { $regex: n } }
            ]
        })
        .skip(page * limit).limit(limit)
        .populate('companyName','name phone').sort({createdAt : -1}).exec(function(err,result){
            console.log(total);
            let remaining = total - ( (page+1) * limit);
            remaining = remaining < 0 ? 0 : remaining ;
            res.status(200).send({message:result,remaining, total});
        });
    } catch (error) {
        res.status(400).send({message:error.message});
    }
}
//get vip offers 
const getVipOffers = async(req,res)=>{
    try {
        const result = await Offer.find({vip : true});
        res.status(200).send({message:result});
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
exports.getVipOffers = getVipOffers ;