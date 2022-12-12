const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
   uuid:{
    type:String
   },
   username:{
    type:String,
    required:true
   },
   role:{
    type:String,
    required: true
   },
   password:{
    type:String,
    required: true

   }
},
{timestamps:true}

)


const user=mongoose.model('User',userSchema);

module.exports={
    user
}