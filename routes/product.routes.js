const path=require('path');

const productController=require(path.join(__dirname,'controller','product.controller'));

const express=require('express');

const productRouter=express.Router();

productRouter.get('/');

productRouter.post('/create');

productRouter.delete('/{uuid}');

productRouter.put('/uuid')



modules.export={
    productRouter
}