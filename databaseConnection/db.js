require('dotenv').config();
const mongoose=require('mongoose');


   const database= mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@project.de4thmz.mongodb.net/Vending?retryWrites=true&w=majority`);
 


module.exports={
    database
}
