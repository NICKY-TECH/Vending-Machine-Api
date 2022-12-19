const path=require('path');

const {user}=require(path.join(__dirname,'..','model','userSchema'));

const {createUserToken}=require(path.join(__dirname,'..','Authentication','authenticate'));

const bcrypt=require('bcrypt');

async function login(req,res){
    const {username,password}=req.body;
    user.findOne({username:username},function(error,userInfo){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:'An error occurred while processing your request',
                data:{}
            })
        }else{
            if(userInfo){
              bcrypt.compare(password,userInfo.password,async function(error,matched){
                if(error){
                    res.status(400).json({
                        success:false,
                        error:[],
                        message:'Invalid user details, please check the data you entered',
                        data:{}
                    })
                }else{
                    const token= await createUserToken(userInfo.id);
                    res.status(200).json({
                        success:true,
                        error:[],
                        message:'You have been logged In successfully',
                        data:{userToken:token}
                    })
                    
                }

              })  
            }else{
                res.status(404).json({
                    success:false,
                    error:[],
                    message:'Invalid user details, please check the data you entered',
                    data:req.body.username
                })
            }
        }
    })

}

module.exports={
    login
}