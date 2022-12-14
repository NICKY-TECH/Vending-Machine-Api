const path=require('path');

const express=require('express');

const {getABuyer,getAllBuyers,DeleteABuyer}=require(path.join(__dirname,'..','controller','buyer.controller'));

const buyerRouter=express.Router();

buyerRouter.get('/buyer/:uuid',getABuyer);

buyerRouter.get('/buyers/list',getAllBuyers);

buyerRouter.delete('/buyer/:uuid',DeleteABuyer);
