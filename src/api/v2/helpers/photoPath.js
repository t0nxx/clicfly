const path = require('path');

function makePath(photo){
    let toPath = Date.now()+photo.name ;
    photo.mv(path.join(__dirname,`../../../../uploads/${toPath}`),function(err){
        if (err) console.log(err);
    });
 return `http://45.32.179.219:5000/uploads/gallery/${toPath}` ;
}


module.exports = {makePath};