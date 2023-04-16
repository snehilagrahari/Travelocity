const jwt = require('jsonwebtoken')
require('dotenv').config();


const validateUser = async (req,res,next) =>{
    try{
        jwt.verify(req.headers.authorization,process.env.JWT_KEY,(error, decoded)=>{
            if(error){
                res.status(400).send({message : error.message});
            }
            else{
                req.body.userId = decoded.id;
                next();
            }
        })
    }
    catch(err){
        res.send({message : err.message});
    }
}

module.exports = {
    validateUser
};