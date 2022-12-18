const mongoose=require('mongoose');

const depositSchema=new mongoose.Schema({
    uuid:{
      type:String,
      required:true
    },
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    amount:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

const deposit=mongoose.model('Deposit',depositSchema);

module.exports={
    deposit
}