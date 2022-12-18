const jwt=require('jsonwebtoken');

async function authenticateUser(id){
    const token= await jwt.sign(id,process.TOKEN_SECRET,{expiresIn:'2days'});
    console.log(token);


}

module.exports={
    authenticateUser
}