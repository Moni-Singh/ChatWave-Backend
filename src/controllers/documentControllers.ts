import { Request, Response } from 'express';
const Document = require('../models/documentModel')
require('dotenv').config();



export const addDocument = async (req: Request, res: Response) => {
  try {
    const document = await Document.create(req.body); 
    res.status(200).json(document);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};



export const getAllDocument = async (req:Request,res : Response)=>{
try{
  const document =await Document.find({});
  res.status(200).json(document);

}catch(error:any){
  console.log(error.message)
  res.status(500).json({message: error.message});
}
};