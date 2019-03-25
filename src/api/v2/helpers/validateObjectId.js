const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const validIdObject = (id)=>{
    if (!ObjectId.isValid(id.toString())) throw new Error ("404 Not Found");
}

exports.validIdObject=validIdObject;