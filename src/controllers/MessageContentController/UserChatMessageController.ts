import { Request, Response } from "express";

require("dotenv").config();
import { decodeToken } from "../../utils/DecodeTokenUtils";
import dotenv from "dotenv";
import UserChatMessage from "../../models/MessageContent/UserChatMesssage";

dotenv.config();

export const userChatMessage = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    if (!token) {
      return false;
    }
    const userId = decodeToken(token);
    console.log("userId", userId);

    const senderId = userId; // Getting senderId from protect middleware

    const { receiverId, data, messageType } = req.body;

    // Creating new message
    const usermessageContent = await UserChatMessage.create({
      senderId: senderId,
      receiverId: receiverId,
      data: data,
      messageType: messageType,
    });

    res.status(200).json(usermessageContent);
  } catch (error) {
    console.log((error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getChatMessageById = async (req: Request, res: Response) => {
  try {
    const { user1, user2 } = req.body;
    const chatMessages = await UserChatMessage.find({
      $or: [
        { $and: [{ senderId: user1 }, { receiverId: user2 }] },
        { $and: [{ senderId: user2 }, { receiverId: user1 }] },
      ],
    });
    res.status(200).json(chatMessages);
  } catch (error) {
    console.log((error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};
