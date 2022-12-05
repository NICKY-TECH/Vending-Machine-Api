const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    uuid:{
        type: String,
    },
    title:{
        type: String,
        required: true
    },
    cost:{
        type: String,
        required: true
    },
    sellerId:[
        {
            type:string,
            required:true
        }],
        timestamps:{
            created_at:'created_at',
            updated_at:'updated_at',
            deleted_at:'deleted_at'
        }
})

const product=mongoose.model('Product',productSchema);

module.exports={
    product
}