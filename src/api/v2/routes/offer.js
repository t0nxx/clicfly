const express = require('express');
const router = express.Router();
const {
    getAllOffers,
    getOneOffer,
    addOffer,
    updateOffer,
    deleteOffer,
    search
} = require('../Controllers/OfferCont');


/*
* get all Offers 
*/
router.get('/',getAllOffers);
/*
* search
*/
router.get('/search',search);

/*
* get Offer
*/
router.get('/:id',getOneOffer);
/*
* add Offer
*/
router.post('/add',addOffer);
/*
* update Offer
*/
router.put('/:id',updateOffer);
/*
* delete Offer
*/
router.delete('/:id',deleteOffer);

exports.OfferRouter=router;