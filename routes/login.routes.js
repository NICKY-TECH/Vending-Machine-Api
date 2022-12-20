const path=require('path');

const {login}=require(path.join(__dirname,'..','controller','login.controller'));




const loginRouter=require('express').Router();

loginRouter.post('/login',login);

module.exports={
    loginRouter
}