const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    userId : {type : String, required : true},
    checkIn : {type : Date, required : true},
    hotelLocation : {type : String, required : true},
    hotelName : {type : String, reqquired : true},
    checkOut : {type : Date, required : true},
    bookedOn : {type : Date, required : true},
    travellers : {type : Number, required : true},
    hotelId : {type : String, required : true},
    roomDetails : {
        roomImageURL : {type : String, required : true},
        roomName : {type : String, required : true},
        roomAmenities : {type : Array, required : true},
        roomPrice : {type : String, required : true},
        roomRating : {type : Number, required : true}
    },
    total : {type : Number, required : true},
    cancelled : {type : Boolean, deafult : false}
},{
    versionKey : false
});

const BookingModel = mongoose.model('booking',bookingSchema);

module.exports = {
    BookingModel
}