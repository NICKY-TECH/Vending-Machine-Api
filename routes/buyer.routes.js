const path=require('path');

const express=require('express');
const { Module } = require('module');


const buyerRouter=express.Router();

const {getSpecificBuyer,getAllBuyers,DeleteABuyer}=require(path.join(__dirname,'..','controller','buyer.controller'));


buyerRouter.get('/buyer/:uuid',   getSpecificBuyer);

buyerRouter.get('/buyers/list',getAllBuyers);

// buyerRouter.delete('/:uuid',DeleteABuyer);


module.exports={
    buyerRouter
}