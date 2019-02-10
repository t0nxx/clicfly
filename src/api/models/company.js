const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const galleryBaseUrl = 'http://localhost:5000/company/gallary/'
const companySchema = new Schema({
    name : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 255
    },
    about : {
        type : String
    },
    stores : [{type:String}],
    gallery : [{type:String}],
    socialMedia : [{type : String }]  /// just dev , add map to this field 
},{timestamps:true});

const Company = model('Company',companySchema);
exports.Company = Company ;