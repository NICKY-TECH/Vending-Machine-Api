require('dotenv').config();
const path=require('path');
const {deposit}=require(path.join(__dirname,'..','model','depositsSchema'));
const {user}=require(path.join(__dirname,'..','model','userSchema'));
const uuid=require('uuid');
const {validationResult}=require('express-validator');

async function makeAdeposit(req,res){
    const {amount}=req.body;
    const depositorUsername=req.body.username;
    const error=validationResult(req);
    if(!error.isEmpty()){
        user.findOne({username:depositorUsername,role:'buyer'},async function(error,buyer){
            if(error){
                res.status(500).json({
                    success:false,
                    error:[],
                    message:"An error occurred whileprocessing your query",
                    data:{}
                })
            }else if(buyer){
           const newDeposit=await deposit.create({
            uuid:uuid.v4()+buyer.username,
            amount:amount,
            buyerId:buyer._id
         })
             res.status(200).json({
                success:true,
                error:[],
                message:`Deposit by ${buyer.username} was successful`,
                data:newDeposit
            })
            }
        })
    }
    


}


async function updateDeposit(req,res){
    const depositorUsername=req.body.username;
    const amountPaid=req.body.amount;
    user.find({username:depositorUsername,role:'buyer'},function(error,foundUser){
      const error=validationResult(req);
      if(!error.isEmpty()){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"An error occurred while processing your request",
                data:{}
            })
        }else if(foundUser){
            deposit.findOneAndUpdate({buyerId:foundUser._id},{amount:amountPaid},{new:true},function(error,updatedDeposit){
                if(error){
                    res.status(500).json({
                        success:false,
                        error:[],
                        message:"An error occurred while processing your request",
                        data:{}
                    })

                }else{
                    res.status(200).json({
                        success:true,
                        error:[],
                        message:`Deposit updated sucessfully by ${foundUser.username}`,
                        data:updatedDeposit
                    })
                }
               
        })
            

            
        }else if(!foundUser){
            res.status(400).json({
                success:false,
                error:[],
                message:"You are not a valid buyer",
                data:{}
            })
        }
      }else{

        res.status(400).json({
            success:false,
            error:error.array(),
            message:"Invalid input",
            data:{}
        })
      }
    })

}

module.exports={
    makeAdeposit,
    updateDeposit
}

