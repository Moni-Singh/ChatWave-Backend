import { Request, Response } from 'express';
const Product = require('../models/productModels');  // Import your model here
require('dotenv').config();

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);  

    res.status(200).json(product);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body); 
    res.status(200).json(product);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


export const getAllProduct = async (req:Request,res : Response)=>{
try{
  const products =await Product.find({});
  res.status(200).json(products);

}catch(error:any){
  console.log(error.message)
  res.status(500).json({message: error.message});
}
};

export const deleteProduct = async(req:Request,res:Response)=>{
  try{

    const {id} = req.params
    const product = await Product.findByIdAndDelete(id)

    if(!product){
      return res.status(404).json({message: `Cannot find product by Id ${id}`})
    }

    res.status(200).json(product);

  }catch(error:any){
    console.log(error.message)
    res.status(500).json({message: error.message});
  }
}


export const updateProduct =async(req:Request,res:Response)=>{
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{new: true});

    if(!product){
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }
  }catch(error:any){
    console.log(error.message)
    res.status(500).json({message: error.message});
  }
};
// app.put('/products/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

//         if (!product) {
//             return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
//         }

//         res.status(200).json(product);
//     } catch (error: any) {
//         res.status(500).json({ message: (error as Error).message });
//     }
// });



