const mongoose=require('mongoose');

const depositSchema=new mongoose.Schema({
    uuid:{
      type:String,
      required:true
    },
    buyerId:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    timestamps:{
        created_at:'created_at',
        updated_at:'updated_at'
    }
})

const deposit=mongoose.model('Deposit',depositSchema);

module.exports={
    deposit
}