const express = require('express');
const router = express.Router();
const {
    getAllCompanies,
    getOneCompany,
    addCompany,
    updateCompany,
    deleteCompany,
} = require('../Controllers/CompanyCont');
const {AdminAuth}= require('../middlewares/adminAuth');



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
router.post('/add',AdminAuth,addCompany);   // require admin permission
/*
* update Company
*/
router.put('/:id',AdminAuth,updateCompany);   // require admin permission
/*
* delete Company
*/
router.delete('/:id',AdminAuth,deleteCompany);   // require admin permission

exports.CompanyRouter=router;