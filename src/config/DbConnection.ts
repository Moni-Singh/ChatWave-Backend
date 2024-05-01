import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB = process.env.MONGODB_URI || ' ';

mongoose.connect(DB).then(()=>{
    console.log("connection succesful")
}).catch((err )=>console.log(err.message))

module.exports = {
    mongoose
};