const path=require('path');

const {userRouter}=require(path.join(__dirname,'routes','user.routes'));

const {buyRouter}=require(path.join(__dirname,'routes','buy.routes'));

const {depositRouter}=require(path.join(__dirname,'routes','deposit.routes'));

const {database}=require(path.join(__dirname,'databaseConnection','db'));



const express=require('express');

const app=express();
app.use(express.json());
app.use('/api/vid/users',userRouter);


const PORT=process.env.PORT||4000;



app.use('api/vid/products',buyRouter);

app.use('api/vid/deposits',depositRouter);

app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`)
})
