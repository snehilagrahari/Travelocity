const express = require('express');
const mongoose = require('mongoose');
const { checkExistingUser } = require('../middlewares/checkExistingUser');
const { UserModel } = require('../models/user.model');
const { checkRegisterDetails } = require('../middlewares/checkRegisterDetails');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../middlewares/validateUser');
const { BookingModel } = require('../models/booking.model');

require('dotenv').config();   //process.env Access

//userRouter => /user access

const userRouter = express.Router();


//register route
userRouter.post('/register',checkExistingUser, checkRegisterDetails , async(req,res)=>{
    try{
        const {
            name,
            email,
            password,
            age,
            address,
            gender,
            mobile
        } = req.body;               // Hashing the password right away if everything works fine
        bcrypt.hash(password, Number(process.env.SALT_ROUNDS), async (err, hash)=>{
            if(err){
                res.status(400).send({message : err.message}); // if error , response status 400
            }
            else{
                const user = new UserModel({
                    name, email,password: hash, age, address, mobile, gender
                });
                await user.save();
                res.send({message : 'Registration Successful!'});       
            }
        })
    }
    catch(err){
        res.send({message : err.message})
    }
})

//login route

userRouter.post('/login',async (req,res)=>{
    try{
        const {email, password} = req.body;
        const match = await UserModel.findOne({email});
        if(match['_id']===undefined){
            res.status(400).send({message : "Login error"});
            return;
        }
        bcrypt.compare(password, match.password, (err, result)=>{
            if(err){
                res.status(400).send({message : err.message});
            }
            else if(result===false){
                res.status(400).send({message : 'Incorrect Password'});
            }
            else if(result===true){
                jwt.sign({id : match['_id']},process.env.JWT_KEY,(err,token)=>{
                    if(err){
                        res.status(400).send({message : err.message});
                    }
                    else{
                        res.send({token, username : match.name});
                    }
                })
            }
        })
    }
    catch(err){
        res.send({message : err.message});
    }
})

userRouter.patch('/forgotPassword',async (req,res)=>{
    try{
        const {email, password} = req.body;
        const match = await UserModel.findOne({email});
        if(match.email===undefined){
            res.send({message : "Email Invalid!"});
            return;
        }
        const result = await bcrypt.compare(password, match.password);
        if(result === true){
            res.send({message : "Old password and new password can not be same!"});
            return;
        }
        bcrypt.hash(password,Number(process.env.SALT_ROUNDS),async (err, hash)=>{
            if(err){
                res.status(400).send({message : err.message});
            }
            else{
                await UserModel.findByIdAndUpdate({_id : match['_id']},{password : hash})
                res.send({message : "Password Updated Successfully!"});
            }
        })
    }
    catch(err){
        res.send({message : err.message});
    }
})

userRouter.get('/bookingHistory',validateUser, async (req,res)=>{
    try{
        const userId = req.body.userId;
        const match = await BookingModel.find({userId});
        res.send({data : match});
    }
    catch(err){
        res.send({message : err.message});
    }
})

userRouter.patch('/cancelBooking/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const response = await BookingModel.findByIdAndUpdate({_id : id},{cancelled : true});
        res.send({message : 'Your Booking has been Cancelled!', id});
    }
    catch(err){
        res.send({message : err.message})
    }
})

module.exports = {
    userRouter
}