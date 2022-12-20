const path=require('path');

const {createUser,getAllUsers,getSpecificSeller, deleteASeller}=require(path.join(__dirname,'..','controller','users.controller'));

const express=require('express');

const {body}=require('express-validator');

const userRouter=express.Router();

userRouter.get('/:uuid',getSpecificSeller);

userRouter.get('/',getAllUsers);

userRouter.post('/create',[
body('username').trim().notEmpty().withMessage('the username field cannot be empty'),
body('password').trim().notEmpty().withMessage('the password field cannot be empty')
.isLength({min:8,max:16}).withMessage('password must be a minimum of 8 characters and a maximum of 16 characters')
]
,createUser);

userRouter.delete('/:uuid',deleteASeller);

// userRouter.put('/uuid', deleteASeller);



module.exports={
    userRouter
}