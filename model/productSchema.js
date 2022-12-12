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
},
{timestamps:true}
)

const product=mongoose.model('Product',productSchema);

module.exports={
    product
}