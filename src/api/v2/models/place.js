const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const placeSchema = new Schema({
    name : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 255
    }
},{timestamps:true});

const Place = model('Place',placeSchema);
exports.Place = Place ;