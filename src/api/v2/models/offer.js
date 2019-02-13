const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const galleryBaseUrl = 'http://localhost:5000/offers/gallary/'
const ObjectId = Schema.Types.ObjectId;
const offerSchema = new Schema({
    title : {
        type : String ,
        minlength : 3 ,
        maxlength : 255 ,
        required : true
    },
    description : {
        type : String ,
        minlength : 3 ,
        maxlength : 255 ,
    },
    photo : {
        type : String,
        get : v => `${galleryBaseUrl}${v}`,
        required : true
    },
    price : {
        type : Number ,
        required : true ,
        min : 0
    },
    place : {
        type : String ,
        required : true ,
    },
    dateFrom : {
        type : String ,
    },
    dateTo : {
        type : String ,
    },
    stores : [{type : String}] ,
},{timestamps:true});

const Offer = model ('Offer' , offerSchema);
exports.Offer=Offer;