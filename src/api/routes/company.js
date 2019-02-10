const express = require('express');
const router = express.Router();
const {
    getAllCompanies,
    getOneCompany,
    addCompany,
    updateCompany,
    deleteCompany,
    addCompanyToFav
} = require('../Controllers/CompanyCont');



/*
* get all Companies
*/
router.get('/',getAllCompanies);

/*
* get Company
*/
router.get('/:id',getOneCompany);
/*
* add Company
*/
router.post('/add',addCompany);
/*
* update Company
*/
router.put('/:id',updateCompany);
/*
* delete Company
*/
router.delete('/:id',deleteCompany);
/*
* add offer to fav
*/
router.post('/:id',addCompanyToFav);

exports.CompanyRouter=router;