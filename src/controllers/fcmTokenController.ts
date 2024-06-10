import { Request, Response } from 'express';
const FCMToken = require('../models/fcmTokenModel')
require('dotenv').config();




export const addFCMToken = async (req: Request, res: Response) => {
    try {
      await FCMToken.create(req.body); 
      res.status(200).json({ message: 'Successfully added FCM token' });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

