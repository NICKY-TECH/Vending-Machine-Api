const path=require('path');

const {User}=require(path.join(__dirname,'..','model','userSchema'));

const {authenticateUser}=require(path.join(__dirname,'..','Authentication','authenticate'));

const bcrypt=require('bcrypt');

async function login(req,res){
    const {username,password}=req.body;
    User.findOne({username:username},{password:0},function(error,user){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:'An error occurred while processing your request',
                data:{}
            })
        }else{
            if(user){
              bcrypt.compare(password,user.password,function(error,matched){
                if(error){
                    res.status(400).json({
                        success:false,
                        error:[],
                        message:'Invalid user details, please check the data you entered',
                        data:{}
                    })
                }else{
                    authenticateUser(matched.id);
                    
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