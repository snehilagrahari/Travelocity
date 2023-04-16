const express = require('express');
const { connection } = require('./config/db.js');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { userRouter } = require('./routes/user.route');
const { hotelRouter } = require('./routes/hotel.route.js');



//middlewares
app.use(cors()); //CORS Unblock
app.use(express.json()); //JSON Formatting

app.use('/user',userRouter);  //User Related Services
app.use('/hotel', hotelRouter);




app.listen(process.env.PORT,async ()=>{
    try{
        await connection;
        console.log('Connected to DB!');
    }
    catch(err){
        console.log('Error Connecting to DB!');
    }
    console.log(`Running on PORT ${process.env.PORT}`);
})