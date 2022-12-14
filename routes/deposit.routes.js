const path=require('path');

const express=require ('express');

const depositController=require(path.join(__dirname,'..','controller','deposits.controllers'));


const depositRouter=express.Router();

depositRouter.post('/create');

depositRouter.patch('/reset');

module.exports={
    depositRouter,
}