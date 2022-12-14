const path=require('path');

const productController=require(path.join(__dirname,'..','controller','products.controller'));

const express=require('express');

const buyRouter=express.Router();



buyRouter.post('/:uuid/buy');





module.exports={
    buyRouter
}