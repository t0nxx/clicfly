const path = require('path');

function makePath(photo){
    let toPath = Date.now()+photo.name ;
    photo.mv(path.join(__dirname,`../../../../uploads/${toPath}`),function(err){
        if (err) console.log(err);
    });
 return `https://traveloffersnhotels.com/images/${toPath}` ;
}


module.exports = {makePath};
