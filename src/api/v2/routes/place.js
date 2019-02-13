const express = require('express');
const router = express.Router();
const {
    getAllPlaces,
    getOnePlace,
    addPlace,
    updatePlace,
    deletePlace,
} = require('../Controllers/PlaceCont');



/*
* get all Places
*/
router.get('/',getAllPlaces);

/*
* get Place
*/
router.get('/:id',getOnePlace);
/*
* add Place
*/
router.post('/add',addPlace);
/*
* update Place
*/
router.put('/:id',updatePlace);
/*
* delete Place
*/
router.delete('/:id',deletePlace);

exports.PlaceRouter=router;