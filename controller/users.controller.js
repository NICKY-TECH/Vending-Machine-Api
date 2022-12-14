const path=require('path');
const {user}=require(path.join(__dirname,'..','model','userSchema'));
const {validationResult}=require('express-validator');
const uuid=require('uuid');
const bcrypt=require('bcrypt');

async function createUser(req,res){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json(errors.array())
    }else{
   user.findOne({username:req.body.username}, async function(error,foundUser){
    if(error){
        res.status(500).json({
            success:false,
            error:[],
            message:'An error occurred while processing your data, please try again',
            data:{}
        })
        console.log(error)
    }else{
        if(foundUser){
            res.status(400).json({
                success:false,
                error:[],
                message:"A user with this username already exists",
                data:{}
            })
        }else{
        const hashed=await bcrypt.hash(req.body.password,12)
         const newUser= await user.create({
            uuid:uuid.v4()+req.body.username,
            username:req.body.username,
            password:hashed,
            role:req.body.role
        })
        res.status(201).json({
            uuid:newUser.uuid,
            username:newUser.username,
            role:newUser.role,
            createdAt:newUser.createdAt,
            updatedAt:newUser.updatedAt
        })
        }
    }

   });
    }


}

async function getAllUsers(req,res){
    const {page}=req.query;
        if(req.query.role=='seller'){
            const pageNumber=page||1;
            const skip=(pageNumber-1)*2;
            user.find({role:'seller'},{password:0},{limit:2,skip:skip},function(error,sellers){
                if(error){
                    res.status(500).json({
                        success:false,
                        error:[],
                        message:"An error occurred while processing your request, please try again",
                        data:{}
                    })
                }else{
                    // if users with the role= users exists
                    if(sellers){
                        res.status(200).json({
                            success:true,
                            error:[],
                            message:"Single Seller Fetched Successfully",
                            data:sellers
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

function getSpecificSeller(req,res){
    const specificSeller=req.params.uuid;
    user.findOne({role:'seller',uuid:specificSeller},{password:0},function(error,seller){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"an error occurred while processing your request",
                data:{}
            })
        }else if(seller){
            res.status(200).json(
                {
                    success:true,
                    error:[],
                    message:"Single seller Fetched Successfully!",
                    data:seller
                }
               
                )
            
        }else if(!seller){
            res.status(404).json({
                success:false,
                error:[],
                message:"no seller with such id exists",
                data:{}
            })
        }
    })


}
function deleteASeller(req,res){
    const specificSeller=req.params.uuid;
    user.deleteOne({role:'seller',uuid:specificSeller}).then((output)=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"seller successfully deleted",
            data:output
        })
    })

}

module.exports={
    createUser,
    getAllUsers,
    getSpecificSeller,
    deleteASeller
}
