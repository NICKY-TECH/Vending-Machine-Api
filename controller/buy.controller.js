const path=require('path');

const {product}=require(path.join(__dirname,'..','model','productSchema'));

const {validationResult}=require('express-validator');

const {deposit}=require(path.join(__dirname,'..','model','depositsSchema'));

const {user}=require(path.join(__dirname,'..','model','userSchema'));

async function buyAProduct(req,res){
    
    const uuidOfProduct=req.params.uuid;
    const userId=req.body.username;
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
        product.findOne({uuid:uuidOfProduct,deleted_at:null},function(errors,productFound){
            if(errors){
                res.status(500).json({
                    success:false,
                    error:errors,
                    message:"An error occurred while processing your request",
                    data:{}
                })
            }else if(productFound){
                user.findOne({username:userId,role:"buyer"},{password:0},function(error,found){
                    if(error){
                        res.status(500).json({
                            success:false,
                            error:[],
                            message:"An error occurred while processing your request",
                            data:{}
                        })
                    }else if(found){
                        deposit.findOne({buyerId:found._id},async function(error,foundDeposit){
                            if(error){
                                res.status(500).json({
                                    success:false,
                                    error:[],
                                    message:"An error occurred while processing your request",
                                    data:{}
                                })
                            }else if(foundDeposit){
                                const productCost=parseInt(productFound.cost);
                                const amountDeposited=parseInt(foundDeposit.amount);
                              const purchaseDetails=await giveChange(amountDeposited,productCost,foundDeposit.buyerId,productFound.uuid);
                              if(purchaseDetails.success==true){
                                res.status(200).json(purchaseDetails)
                              }else{
                                res.status(400).json(purchaseDetails)
                              }
    
                               
                                
                            }else{
                                res.status(404).json({
                                    success:false,
                                    error:[],
                                    message:`${found.username} hasn't made any deposit yet`,
                                    data:{}
                                })
                            }
    
    
                        })
                    }
                })
                
    
            }else{
                res.status(404).json({
                    success:false,
                    error:[],
                    message:"Invalid uuid, no product exists with such a uuid",
                    data:{}

                })
            }
        })
    }


}

//This controller processess buying process for a buyer

async function giveChange(dep,amount,depositId,products){
    if(dep==amount){
        await deposit.deleteOne({buyerId:depositId})
        await product.deleteOne({uuid:products})
     return  {
            success:true,
            error:[],
            message:"Your purchase was successful",
            data:{}
        }

    }else if(dep<amount){
        const cal=amount-dep;
        const positiveValue=-(cal);
        return {
            success:false,
            error:[],
            message:`You are ${positiveValue} short the actual cost is ${amount}`,
            data:{}

        }
    }else if(dep>amount){
        await deposit.deleteOne({buyerId:depositId});
        await product.deleteOne({uuid:products})
        const cal=dep-amount;
        const positiveValue=(cal);
        return  {
            success:true,
            error:[],
            message:`Your purchase was successful, here's your ${positiveValue} change the actual cost ${amount}`,
            data:{}
        }

    }

}

module.exports={
    buyAProduct
}