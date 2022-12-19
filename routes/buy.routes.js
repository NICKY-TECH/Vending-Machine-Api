const path=require('path');

const {buyAProduct}=require(path.join(__dirname,'..','controller','products.controller'));

const express=require('express');

const buyRouter=express.Router();



buyRouter.post('/:uuid/buy',buyAProduct);





module.exports={
    buyRouter
}