const path=require('path');

const express=require ('express');

const {body}=require('express-validator');

const {makeAdeposit,updateDeposit}=require(path.join(__dirname,'..','controller','deposits.controllers'));


const depositRouter=express.Router();

depositRouter.post('/create',
[
body('amount').trim().notEmpty().withMessage('The amount field cannpot be empty'),
body('username').trim().notEmpty().withMessage('username field cannot be empty')
] ,makeAdeposit);

depositRouter.patch('/reset',[
body('amount').trim().notEmpty().withMessage('The amount field cannot be empty'),
body('username').trim().notEmpty().withMessage('username field cannot be empty')
],updateDeposit);

module.exports={
    depositRouter,
}