const path=require('path');

const {product}=require(path.join(__dirname,'..','model','productSchema'));

const {deposit}=require(path.join(__dirname,'..','model','depositsSchema'));

const {user}=require(path.join(__dirname,'..','model','userSchema'));

async function buyAProduct(req,res){
    const uuidOfProduct=req.params.uuid;
    const userId=req.body.username;
    product.findOne({uuid:uuidOfProduct},function(error,productFound){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"An error occurred while processing your request",
                data:{}
            })
        }else if(productFound){
            user.findOne({username:userId,role:"buyer"},function(error,found){
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
                            const amountDeposited=parseInt(foundDeposit);
                           await giveChange(amountDeposited,productCost,foundDeposit.buyerId);

                           
                            
                        }


                    })
                }
            })
            

        }
    })


}

async function giveChange(dep,amount,depositId){
    if(dep==amount){
        deposit.deleteOne({buyerId:depositId})
     return  res.status(200).json({
            success:true,
            error:[],
            message:"Your purchase was successful",
            data:{}
        })

    }else if(dep<amount){
        const cal=amount-dep;
        const positiveValue=-(cal);
        return res.status(400).json({
            success:false,
            error:[],
            message:`You are ${positiveValue} short`,
            data:{}

        })
    }else if(dep>amount){
        deposit.deleteOne({buyerId:depositId});
        const cal=dep-amount;
        const positiveValue=(cal);
        return  res.status(200).json({
            success:true,
            error:[],
            message:`Your purchase was successful, here's your ${positiveValue} change`,
            data:{}
        })

    }

}

module.exports={
    buyAProduct
}