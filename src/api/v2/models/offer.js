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
        es_indexed:true ,
        es_type:'string' /// not searchable
    },
    homePhoto : {
        type : String,
       // get : v => `${galleryBaseUrl}${v}`,
        required : true
    },
    singlePhoto : {
        type : String,
      //  get : v => `${galleryBaseUrl}${v}`,
        required : true
    },
    price : {
        type : Number ,
        required : true ,
        min : 0 ,
        es_indexed:true ,
        es_type:'integer' ///not search
    },
    place : {
        type : String,
        required : true ,
        es_indexed:true ,
        es_type:'string'  
    },
    companyName : {
        type : ObjectId,ref :'Company',
        required : true ,   //search
        es_type:'nested', 
        es_include_in_parent:true
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
    startDate : {
        type : Date ,
        required : true
    },
    endDate : {
        type : Date ,
        required : true

    }
},{timestamps:true});

offerSchema.plugin(mongoosastic,{
    //hosts:['localhost:9200'],
    hydrate: true,
    populate : [
        {path: 'companyName', model: 'Company' ,select: 'name phone'}
    ]
    
   // hydrateOptions: {select: 'category price place'}
  });
const Offer = model ('Offer' , offerSchema);

// let stream = Offer.synchronize()
// , count = 0;

// stream.on('data', function(err, doc){
// count++;
// });
// stream.on('close', function(){
// console.log('indexed ' + count + ' documents!');
// });
// stream.on('error', function(err){
// console.log(err);
// });
exports.Offer=Offer;