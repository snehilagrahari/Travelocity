const express = require('express');
const { HotelModel } = require('../models/hotel.model');
const jwt = require('jsonwebtoken');
const { BookingModel } = require('../models/booking.model');
const {validateUser} = require('../middlewares/validateUser.js');


const hotelRouter = express.Router();

hotelRouter.get("/", async(req,res)=>{
    // console.log("hite");
    try{
        const {sort, order, lte, cityName, q} = req.query;
        const searchQuery = {};
        if(lte !== ""){
            searchQuery.hotelPrice = {'$lte' : Number(lte)};
        }
        if(cityName !== undefined){
            searchQuery.hotelLocation = cityName;
        }
        if(q !== ''){
            searchQuery.hotelName = q;
        }
        var match;
        if(sort !== ""){
            match = await HotelModel.find(searchQuery).sort({[sort] : order==='ASC'?-1:1});
        }
        else{
            match = await HotelModel.find(searchQuery);
        }
        res.send(match);
    }
    catch(err){
        res.send({message : err.message});
    }
})

hotelRouter.post('/add',async (req,res)=>{
    try{
        const {
            hotelName,
            hotelLocation,
            hotelPrice,
            hotelDiscount,
            hotelImages,
            hotelRating,
            hotelReviews,
            hotelStar,
            hotelAmenities,
            hotelRooms
        } = req.body;
        const hotel = new HotelModel({
            hotelName,
            hotelLocation,
            hotelPrice,
            hotelDiscount,
            hotelImages,
            hotelRating,
            hotelReviews,
            hotelStar,
            hotelAmenities,
            hotelRooms
        });
        await hotel.save();

        res.send({message : "Hotel has been sucessfully added!"});
    }
    catch(err){
        res.send({message : err.messgae});
    }
})

hotelRouter.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const response = await HotelModel.findById({_id : id});
        if(response['_id']===undefined){
            res.status(404).send({message : 'Hotel Not Found!'});
        }
        res.send(response);
    }
    catch(err){
        res.send({message : err.message});
    }
})


// hotelRouter.get('/deleteMany',async (req,res)=>{
//     try{
//         await HotelModel.deleteMany({});
//         res.send({message : "deleted SuccessFully"});

//     }
//     catch(err){
//         res.send({message : err.message});
//     }  
// })
// CHANGE GET TO POST IN :ID ROUTE

hotelRouter.post('/bookRoom',async (req,res)=>{
    try{
        const token = req.headers.authorization;
        jwt.verify(token, process.env.JWT_KEY,async (err, decoded)=>{
            if(err){
                res.status(400).send({message : err.message});
            }
            else{
                const userId = decoded.id;
                const {
                    hotelId,
                    hotelLocation,
                    checkIn,
                    checkOut,
                    hotelName,
                    travellers,
                    roomDetails,
                    total
                } = req.body;
                console.log(req.body);
                const todayDate = new Date();
                const booking = new BookingModel({
                    userId,
                    hotelLocation,
                    hotelId,
                    checkIn,
                    hotelName,
                    checkOut,
                    travellers,
                    roomDetails,
                    bookedOn : todayDate,
                    cancelled : false,
                    total
                });
                await booking.save();
                res.send({message : "Booking has been made in your name."});
            }
        })
    }
    catch(err){
        res.send({message : err.message});
    }
})

module.exports = {
    hotelRouter
}

