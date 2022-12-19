const path=require('path');

const express=require ('express');

const {body}=require('express-validator');

const {  makeAdeposit}=require(path.join(__dirname,'..','controller','deposits.controllers'));


const depositRouter=express.Router();

depositRouter.post('/create',[body('amount').trim().notEmpty()] ,makeAdeposit);

depositRouter.patch('/reset');

module.exports={
    depositRouter,
}