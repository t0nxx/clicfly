const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const galleryBaseUrl = 'http://45.32.179.219:5000/uploads/gallery/'
const ObjectId = Schema.Types.ObjectId;
const mongoosastic = require('mongoosastic');
const offerSchema = new Schema({
    category : {
        type : String ,
        enum : ['Company','Hotel'] ,
        required : true ,
    },
    homePhoto : {
        type : String,
        get : v => `${galleryBaseUrl}${v}`,
        required : true
    },
    singlePhoto : {
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
        type : String,
        required : true ,
    },
    companyName : {
        type : ObjectId,ref :'Company',
        required : true ,
    },
    special : {
        type : Boolean ,
        default : false
    },
    includesTickets : {
        type : Boolean ,
        default : false
    },
    includeAccommodation : {
        type : Boolean ,
        default : false
    },
    dateFrom : {
        type : Date ,
    },
    dateTo : {
        type : Date ,
    }
},{timestamps:true});

offerSchema.plugin(mongoosastic,{
    hosts:['localhost:9200'],
    hydrate: true,
    hydrateOptions: {select: 'category price place'}
  });
const Offer = model ('Offer' , offerSchema);
exports.Offer=Offer;