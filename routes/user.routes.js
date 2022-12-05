const path=require('path');

const userController=require(path.join(__dirname,'controller','users.controller'));

const express=require('express');

const userRouter=express.Router();

userRouter.get('/');

userRouter.post('/create');

userRouter.delete('/{uuid}');

userRouter.put('/uuid')



module.exports={
    userRouter
}