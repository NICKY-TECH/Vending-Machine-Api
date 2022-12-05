const path=require('path');

const express=require ('express');

const depositController=require(path.join(__dirname,'controller','deposits.controller'));


const depositRouter=express.Router();

depositRouter.get();

modules.export={
    depositRouter,
}