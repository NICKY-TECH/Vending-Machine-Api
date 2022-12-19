const path=require('path');

const {addProduct, getAllProducts,deleteAnItem,getSpecificProduct}=require(path.join(__dirname,'..','controller','products.controller'));

const { authenticateUser}=require(path.join(__dirname,'..','Authentication','authenticate'));

const {body}=require('express-validator')

const productRouter=require('express').Router();

productRouter.post('/create',authenticateUser,[
    body('title').trim().notEmpty().withMessage('title field cannot be empty'),
    body('cost').notEmpty().withMessage('the cost field cannot be empty')
],addProduct);

productRouter.get('/',getAllProducts);

productRouter.get('/product',getSpecificProduct);

productRouter.delete('/:uuid',authenticateUser,deleteAnItem);


module.exports={
    productRouter
}

