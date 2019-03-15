const express = require('express');
const router = express.Router();
const fileUpload= require('express-fileupload');
const {
    getAllOffers,
    getOneOffer,
    addOffer,
    updateOffer,
    deleteOffer,
    search
} = require('../Controllers/OfferCont');
const {AdminAuth}= require('../middlewares/adminAuth');

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
router.post('/add',fileUpload(),addOffer); // require admin permission , not at dev *** important***
/*
* update Offer
*/
router.put('/:id',AdminAuth,updateOffer); // require admin permission
/*
* delete Offer
*/
router.delete('/:id',AdminAuth,deleteOffer); // require admin permission

exports.OfferRouter=router;