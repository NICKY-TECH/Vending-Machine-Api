require('dotenv').config();
const jwt=require('jsonwebtoken');

async function createUserToken(id){
    const token= await jwt.sign({user_id:id},process.env.TOKEN_SECRET,{expiresIn:'2days'});
    return token;


}

async function authenticateUser(req,res,next){
    const bearer=req.headers['authorization'];
    if(bearer){
     const verifyToken=bearer.split(' ')[1];
     req.authenticate_token=verifyToken;
        next()
    }else{
        console.log('invalid data');
    }
  

}

module.exports={
    createUserToken,
    authenticateUser
}