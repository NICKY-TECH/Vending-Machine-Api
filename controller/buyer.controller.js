const path=require('path');
const {user}=require(path.join(__dirname,'..','model','userSchema'));



async function getAllBuyers(req,res){
    const {page}=req.query;
        if(req.query.role=='buyer'){
            const pageNumber=page||1;
            const skip=(pageNumber-1)*2;
            user.find({role:'buyer'},{password:0},{limit:2,skip:skip,sort:{username:'desc'}},function(error,buyers){
                if(error){
                    res.status(500).json({
     
                        message:"An error occurred while processing your request, please try again",
                    })
                }else{
                    // if users with the role= users exists
                    if(buyers){
                        res.status(200).json({
                            buyers

                        })
                    }else{
                        // if users with the role users doesn't exist
                        res.status(404).json({
                            message:`No user with the role ${req.body.role} exists`
                        })
                        
                    }
                }
            })
        }else if(req.query.role!='seller'&&req.query.role!='buyer'){
            res.status(400).json({
                
                message:"Invalid user role",
        
            })
        }
    
    }

function getSpecificBuyer(req,res){
    const specificBuyer=req.params.uuid;
    user.findOne({role:'buyer',uuid:specificBuyer},{password:0},function(error,buyer){
        if(error){
            res.status(500).json({
                
                message:"an error occurred while processing your request",
            
            })
        }else if(buyer){
            res.status(200).json({
            
           
                data:buyer
            })
            
        }else if(!seller){
            res.status(404).json({
                message:"no buyer with such id exists",
            })
        }
    })


}
function deleteABuyer(req,res){
    const specificBuyer=req.params.uuid;
  user.deleteOne({role:'buyer',uuid:specificBuyer}).then((output)=>{
        res.status(200).json({
        output
        })
    })

}

module.exports={
    getAllBuyers,
    getSpecificBuyer,
    deleteABuyer
}
