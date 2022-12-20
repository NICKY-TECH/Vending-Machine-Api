require('dotenv').config();
const path=require('path');
const {deposit}=require(path.join(__dirname,'..','model','depositsSchema'));
const {user}=require(path.join(__dirname,'..','model','userSchema'));
const uuid=require('uuid');
const {validationResult}=require('express-validator');

async function makeAdeposit(req,res){
    const error=validationResult(req);

    if(!error.isEmpty()){
        res.status(422).json({
           success:false,
            error:error.array(),
            message:"Invalid input",
            data:{}
        })
    }

    else{
        const amountPaid=req.body.amount;
        const depositorUsername=req.body.username;
        user.findOne({username:depositorUsername,role:'buyer'},async function(error,buyer){
            if(error){
                res.status(500).json({
                    success:false,
                    error:[],
                    message:"An error occurred whileprocessing your query",
                    data:{}
                })
            }else if(buyer){
          deposit.findOne({buyerId:buyer._id},{password:0},async function(issue,depositor){
            if(issue){
                res.status(500).json({
                    success:false,
                    error:[],
                    message:"An error occurred why processing your query",
                    data:{}
                })

            }else if(depositor){
                res.status(400).json({
                    success:true,
                    error:[],
                    message:"You already made a deposit, you reset the amount if you wish to",
                    data:{}
                })

            }else{
                const newDeposit=await deposit.create({
                    uuid:uuid.v4()+buyer.username,
                    amount:amountPaid,
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
            }else{
                res.status(404).json({
                    success:false,
                    error:[],
                    message:`only users with the buyer role can make deposits`,
                    data:{}
                })

            }
        })
    }
    


}

async function updateDeposit(req,res){
    const depositorUsername=req.body.username;
    const amountPaid=req.body.amount;
    user.findOne({username:depositorUsername,role:'buyer'},function(error,foundUser){
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        res.status(422).json({
            success:false,
            error:errors.array(),
            message:"Invalid input",
            data:{}
        })
    
              }else{
                if(error){
                    res.status(500).json({
                        success:false,
                        error:[],
                        message:"An error occurred while processing your request",
                        data:{}
                    })
                }else if(foundUser){
                    deposit.findOneAndUpdate({buyerId:foundUser._id},{$set:{amount:amountPaid}},{new:true},function(error,updatedDeposit){
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
                    res.status(404).json({
                        success:false,
                        error:[],
                        message:"You are not a valid buyer",
                        data:{}
                    })
                }
        

       
      }
    })

}

module.exports={
    makeAdeposit,
    updateDeposit
}

