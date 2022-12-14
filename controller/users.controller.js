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
        // res.status(500).json({
        //     message:'An error occurred while processing your data, please try again',
        //     errorMessage:error
        // })
        console.log(error)
    }else{
        if(foundUser){
            res.status(403).json({
                message:"A user with this username already exists"
            })
        }else{
        const hashed=await bcrypt.hash(req.body.password,12)
         const newUser= await user.create({
            uuid:uuid.v4()+req.body.username,
            username:req.body.username,
            password:hashed,
            role:req.body.role
        })
        res.status(200).json(newUser)
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
                        message:"An error occurred while processing your request, please try again"
                    })
                }else{
                    // if users with the role= users exists
                    if(sellers){
                        res.status(200).json(sellers)
                    }else{
                        // if users with the role users doesn't exist
                        res.status(404).json({
                            message:`No user with the role ${req.body.role} exists`
                        })
                        
                    }
                }
            })
        }
    
    }

function getSpecificSeller(req,res){
    const specificSeller=req.params.uuid;
    user.findOne({role:'seller',uuid:specificSeller},function(error,seller){
        if(error){
            res.status(500).json({
                message:"an error occurred while processing your request",
            })
        }else if(seller){
            res.status(200).json(seller)
            
        }else if(!seller){
            res.status(404).json({
                message:"no seller with such id exists"
            })
        }
    })


}
function deleteASeller(req,res){
    const specificSeller=req.params.uuid;
    user.deleteOne({role:'seller',uuid:specificSeller}).then((output)=>{
        res.status(200).json({
            message:"seller successfully deleted"
        })
    })

}

module.exports={
    createUser,
    getAllUsers,
    getSpecificSeller,
    deleteASeller
}
