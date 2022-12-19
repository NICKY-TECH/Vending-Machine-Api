const path=require('path');

const {userRouter}=require(path.join(__dirname,'routes','user.routes'));

const {buyRouter}=require(path.join(__dirname,'routes','buy.routes'));

const {depositRouter}=require(path.join(__dirname,'routes','deposit.routes'));

const {buyerRouter}=require(path.join(__dirname,'routes','buyer.routes'));

const {productRouter}=require(path.join(__dirname,'routes','product.routes'));

const {loginRouter}=require(path.join(__dirname,'routes','login.routes'));

const {database}=require(path.join(__dirname,'databaseConnection','db'));



const express=require('express');

const app=express();
app.use(express.json());
app.use('/api/vd',buyerRouter);
app.use('/api/vd/users',userRouter);
// app.use('api/vd/products',buyRouter);

app.use('/api/vd/products',productRouter);

app.use('api/vd/deposits',depositRouter);
app.use(loginRouter);


const PORT=process.env.PORT||4000;





app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`)
})
