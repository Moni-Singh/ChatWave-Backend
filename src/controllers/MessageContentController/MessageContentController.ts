import { Request, Response } from "express";
const ChatMessage = require("../../models/MessageContent/ChatMessage");
require("dotenv").config();

export const addMesssageContent = async (req: Request, res: Response) => {
  try {
    const messageContent = await ChatMessage.create(req.body);
    res.status(200).json(messageContent);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
