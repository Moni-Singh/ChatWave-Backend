
import mongoose from "mongoose";



const fcmTokenSchema = new mongoose.Schema({
    fcmToken: {
        type: String,
        required: [true, "Please post token"]

    }}
);

const FCMToken = mongoose.model('fcmToken', fcmTokenSchema);

module.exports = FCMToken;
