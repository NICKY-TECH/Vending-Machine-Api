const path=require('path');

const {login}=require(path.join(__dirname,'..','controller','login.controller'));

// const {authenticateUser}=require(path.join(__dirname,'..','Authenticate','authenticate'));



const loginRouter=require('express').Router();

loginRouter.post('/login',login);

module.exports={
    loginRouter
}