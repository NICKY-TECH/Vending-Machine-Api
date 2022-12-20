const path=require('path');

const {buyAProduct}=require(path.join(__dirname,'..','controller','buy.controller'));

const {body}=require('express-validator');

const express=require('express');

const buyRouter=express.Router();



buyRouter.post('/:uuid/buy',[
    body('username').trim().notEmpty().withMessage('The username field cannot be empty')
],buyAProduct);





module.exports={
    buyRouter
}