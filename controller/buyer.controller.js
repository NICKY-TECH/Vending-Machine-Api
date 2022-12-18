const path=require('path');
const {user}=require(path.join(__dirname,'..','model','userSchema'));



async function getAllBuyers(req,res){
    const {page}=req.query;
        if(req.query.role=='buyer'){
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
                            data:buyers

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
                data:seller
            })
            
        }else if(!seller){
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
function deleteABuyer(req,res){
    const specificBuyer=req.params.uuid;
  user.findOneAndDelete({role:'buyer',uuid:specificBuyer}).then((output)=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"buyer successfully deleted",
            data:output
        })
    })

}

module.exports={
    getAllBuyers,
    getSpecificBuyer,
    deleteABuyer
}
