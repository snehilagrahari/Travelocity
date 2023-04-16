const { UserModel } = require("../models/user.model");

const checkExistingUser = async (req,res,next)=>{
    try{
        const {
            email,
            mobile
        } = req.body;
        const match = await UserModel.find({email});
        if(match.length>0){
            res.status(400).send({message : 'User already exists with this email'});
        }
        else{
            const match2 = await UserModel.find({mobile});
            if(match2.length>0){
                res.status(400).send({message : 'User alredy exists with this mobile'});
            }
            else{
                next();
            }
        }
    }
    catch(err){
        res.send({message : err.message});
    }
}

module.exports = {
    checkExistingUser
}