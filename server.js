const express = require('express');
const mongoose = require('mongoose');
const app  = express();
const cors = require('cors');
const {AdminRouter} = require('./src/api/routes/admin');
const {CompanyRouter} = require('./src/api/routes/company');
const {OfferRouter} = require('./src/api/routes/offer');
const {UserRouter} = require('./src/api/routes/user');
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use('/admins' , AdminRouter);
app.use('/companies' , CompanyRouter);
app.use('/offers' , OfferRouter);
app.use('/users' , UserRouter);

app.get('/' , (req,res) => {
    res.status(200).send("welcome home route");
});
app.use('*' , (req,res) => {
    res.status(404).send("no route was found ");
});

exports.app = app ;
exports.mongoose = mongoose ;
