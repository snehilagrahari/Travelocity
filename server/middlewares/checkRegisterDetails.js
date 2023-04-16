const checkRegisterDetails = (req,res,next) =>{
    try{
        const {
            password,
            mobile,
            address
        } = req.body;
        if(password.length<=6){
            res.status(400).send({message : "Weak Password! Min 8 characters required!"})
        }
        else{
            if(mobile.length!=10){
                res.status(400).send({message : "Invalid Mobile Number!"});
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
    checkRegisterDetails
}