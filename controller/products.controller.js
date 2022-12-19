require('dotenv').config();

const path=require('path');

const {product}=require(path.join(__dirname,'..','model','productSchema'));

const {user}=require(path.join(__dirname,'..','model','userSchema'));

const jwt=require('jsonwebtoken');

const {validationResult}=require('express-validator');

const uuid=require('uuid');

async function addProduct(req,res){
    const errors=validationResult(req);

    console.log(req.authenticate_token);
    
    jwt.verify(req.authenticate_token,process.env.TOKEN_SECRET,async(error,decoded)=>{
        if(error){
            res.status(400).json({
                success:false,
                error:[error],
                message:"you are not authorized to access this route",
                data:{}
            })
        }else{
              user.findOne({_id:decoded.user_id,role:'seller'}, async function(error,User){
                if(error){
                    res.status(500).json({
                        success:false,
                        error:[],
                        message:'An error occurred while processing your request',
                        data:{}
                    })
                }else if(User){
                    if(!errors.isEmpty()){
                        res.status(400).json({
                            success:false,
                            error:errors.array(),
                            message:'Invalid input',
                            data:[],
                        })
                    }
                   
                else{
                    product.findOne({title:req.body.title},{},{sort:{quantity:-1}}, async function(error,productFound){
                        if(error){
                            res.status(500).json({
                                success:false,
                                error:[],
                                message:"An error occurred while processing your request",
                                data:{}
                            })
                        }else if(productFound){
                        const newProduct= await product.create({
                            uuid:uuid.v4()+decoded.user_id,
                            title:req.body.title,
                            cost:productFound.cost,
                            quantity:parseInt(productFound.quantity)+1,
                            sellerId:decoded.user_id,
                 
                 
                         })
                         res.status(200).json({
                            success:true,
                            error:[],
                            message:"A new product has been created successfully",
                            data:newProduct,
                         });
                    }
                        else{
                        const newProduct= await product.create({
                            uuid:uuid.v4()+decoded.user_id,
                            title:req.body.title,
                            cost:req.body.cost,
                            quantity:req.body.quantity?parseInt(req.body.quantity):parseInt(1),
                            sellerId:decoded.user_id,
                 
                 
                         })
                         res.status(200).json({
                            success:true,
                            error:[],
                            message:"A new product has been created successfully",
                            data:newProduct,
                         });
                    
                        }
    
                    })

                
                }
   

              
             
            }
            else{
                res.status(404).json({
                    success:false,
                    error:[],
                    message:'User unauthorized to access this route',
                    data:{}
                })
            }

        })
    

            
        }
    })

  
}

async function getAllProducts(req,res){
    const page=req.query.page?req.query.page:1;
    const skip=(page-1)*4;

    product.find({},{},{limit:4,skip:skip},function(error,allProducts){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"An error occurred while processing your request, please try again",
                data:{}
            })
        }else{
            res.status(200).json({
                success:true,
                error:[],
                message:"All products have been successfully requested for",
                data:allProducts

            })
        }

    })

}

async function deleteAnItem(req,res){
    const itemUuid=req.params.uuid;
    jwt.verify(req.authenticate_token,process.env.TOKEN_SECRET,async(error,decodedToken)=>{
        if(error){
            res.status(400).json({
                success:false,
                error:[error],
                message:"You are unauthorized to carry out this operation",
                data:{}
            })
        }else{
           product.findOneAndDelete({sellerId:decodedToken.user_id,uuid:itemUuid}, async function(error,deletedItem){
            if(error){

                res.status(500).json({
                                            success:false,
                                            error:[],
                                            message:"An error occurred while processing your request",
                                            data:{}
                                        })
            }else{

                if(deletedItem){
                                    
                                        res.status(200).json({
                                            success:true,
                                            error:[],
                                            message:"Item deleted successfully",
                                            data:deletedItem
                                        })
                                    }else if(!deletedItem){
                                        res.status(404).json({
                                            success:false,
                                            error:[],
                                            message:"You are either not permitted to delete this item or you provided an invalid uuid",
                                            data:{}
                                        })
                    
                                    }

            }

           })
        }
    })
}
async function getSpecificProduct(req,res){
    const {title}=req.query;
    product.find({title},function(error,product){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"An error occurred while processing your request, please try again",
                data:{}
            })
        }else{
            res.status(200).json({
                success:true,
                error:[],
                message:"Product found successfully",
                data:product,
            })
        }
        
    });
}

module.exports={
    addProduct,
    getAllProducts,
    deleteAnItem,
    getSpecificProduct
}