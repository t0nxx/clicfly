const express = require('express');
const router = express.Router();
const {
    getAllOffers,
    getOneOffer,
    addOffer,
    updateOffer,
    deleteOffer,
    addOfferToFav
} = require('../Controllers/OfferCont');


/*
* get all Offers 
*/
router.get('/',getAllOffers);

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
/*
* add offer to fav
*/
router.post('/:id',addOfferToFav);

exports.OfferRouter=router;