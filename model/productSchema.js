const mongoose=require('mongoose');

    const productSchema=new mongoose.Schema({
        uuid:String,
        title:String,
        cost:String,
        quantity:Number,
        sellerId:String,
        deleted_at:String
    
    },
    {timestamps:true});
const product=mongoose.model('Product',productSchema);

module.exports={
    product
}