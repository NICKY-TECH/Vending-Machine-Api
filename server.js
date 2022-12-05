const path=require('path');

const {userRouter}=require(path.join(__dirname,'routes','user.routes'));

const {productRouter}=require(path.join(__dirname,'routes','product.routes'));

const {depositRouter}=require(path.join(__dirname,'routes','deposit.routes'));



const express=require('express');

const app=express();

const PORT=process.env.PORT;


app.use('api/vid/users',userRouter);

app.use('api/vid/products',productRouter);

app.use('api/vid/deposits',depositRouter);

app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`)
})
