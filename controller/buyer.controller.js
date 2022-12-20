const path=require('path');
const {user}=require(path.join(__dirname,'..','model','userSchema'));



async function getAllBuyers(req,res){
    const {page}=req.query;
            const pageNumber=page||1;
            const skip=(pageNumber-1)*2;
            user.find({role:'buyer'},{password:0},{limit:2,skip:skip},function(error,buyers){
                if(error){
                    res.status(500).json({
                        success:false,
                        error:[],
                        message:"An error occurred while processing your request, please try again",
                        data:{}
                    })
                }else{
                    // if users with the role= users exists
                    if(buyers){
                        res.status(200).json({
                            success: true,
                            error:[],
                            message: 'All buyers fetched successfully!',
                            data:{
                            pageNumber,
                            buyers
                            }

                        })
                    }else{
                        // if users with the role users doesn't exist
                        res.status(404).json({
                            success:false,
                            error:[],
                            message:`No user with the role ${req.body.role} exists`,
                            data:{}
                        })
                        
                    }
                }
            })
        
    
    }

function getSpecificBuyer(req,res){
    const specificBuyer=req.params.uuid;
    user.findOne({role:'buyer',uuid:specificBuyer},function(error,buyer){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"an error occurred while processing your request",
                data:{}
            })
        }else if(buyer){
            res.status(200).json({
                success:true,
                error:[],
                message:'Single Buyer Fetched Successfully!',
                data:
                    {
                        _id:buyer._id,
                        uuid: buyer.uuid,
                        username: buyer.username,
                        role: buyer.role,
                        createdAt: buyer.createdAt,
                        updatedAt: buyer.updatedAt
                }
            })
            
        }else if(!buyer){
            res.status(404).json({
                success:false,
                error:[
                {
                    msg:'invalid uuid'
                }
                ],
                message:"no buyer with such id exists",
                data:{

                }
            })
        }
    })


}
async function deleteABuyer(req,res){
 const specificBuyer=req.params.uuid;
  user.findOneAndDelete({role:'buyer',uuid:specificBuyer},{password:0}).then((output)=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"buyer successfully deleted",
            data:{
                    _id:output._id,
                    uuid: output.uuid,
                    username: output.usernam,
                    role: output.role,
                    createdAt: buyer.createdAt,
                    updatedAt: buyer.updatedAt
            }
        })
    })

}

module.exports={
    getAllBuyers,
    getSpecificBuyer,
    deleteABuyer
}
