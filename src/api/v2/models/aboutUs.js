const mongoose = require('mongoose');
const {Schema} = mongoose;
const {model} = mongoose;

const aboutUsSchema = new Schema({
    Description : {
        type : String 
    }
})
const AboutUs = model('AboutUs',aboutUsSchema);
exports.AboutUs = AboutUs ;