import { Request, Response } from "express";
import User from "../models/User";
require("dotenv").config();

export const getAllUserList = async (req: Request, res: Response) => {
  try {
    const userList = await User.find({});
    res.status(200).json(userList);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
