const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const galleryBaseUrl = 'http://localhost:5000/offers/gallary/'
const ObjectId = Schema.Types.ObjectId;
const offerSchema = new Schema({
    category : {
        type : String ,
        enum : ['Company','Airline'] ,
        required : true
    },
    description : {
        type : String ,
        minlength : 3 ,
        maxlength : 255 ,
        required : true
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
        type : [{type:ObjectId,ref :'Place'}],
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
    dateFrom : {
        type : Date ,
    },
    dateTo : {
        type : Date ,
    }
},{timestamps:true});

const Offer = model ('Offer' , offerSchema);
exports.Offer=Offer;