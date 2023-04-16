const mongoose = require('mongoose');


const hotelSchema = mongoose.Schema({
    hotelName : {type : String, required : true},
    hotelImages : {type : Array, required : true},
    hotelLocation : {type : String, required : true},
    hotelRating : {type : Number, required : true},
    hotelReviews : {type : Number, required : true},
    hotelAmenities : {type : Array, required : true},
    hotelDiscount : {type : Number, required : true},
    hotelPrice : {type : Number, required : true},
    hotelStar : {type : Number, required : true},
    hotelRooms : [
        {
            roomImageURL : {type : String, required: true},
            roomAmenities : {type : Array, required: true},
            roomPrice : {type : Number, required: true},
            roomRating : {type : Number, required: true},
            roomName : {type : String, required: true},
        }
    ]
},
{
    versionKey : false
});

const HotelModel = mongoose.model('hotel',hotelSchema);

module.exports = {
    HotelModel
}