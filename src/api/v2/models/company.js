const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const model = mongoose.model;
const companySchema = new Schema({
    name : {
        type : String ,
        required : true ,
        minlength : 3 ,
        maxlength : 255
    }
},{timestamps:true});

const Company = model('Company',companySchema);
exports.Company = Company ;