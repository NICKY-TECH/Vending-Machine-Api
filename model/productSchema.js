const mongoose=require('mongoose');

    const productSchema=new mongoose.Schema({
        uuid:String,
        title:String,
        cost:String,
        sellerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        deleted_at:String
    
    },
    {timestamps:true});
const product=mongoose.model('Product',productSchema);

module.exports={
    product
}