import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes';
import './config/DbConnection';
import './middleware/authmiddlewares';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
