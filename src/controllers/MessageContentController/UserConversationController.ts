import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
require("dotenv").config();
import dotenv from "dotenv";
import User from "../../models/User";
import UserChatMessage from "../../models/MessageContent/UserChatMesssage";
import { decodeToken } from "../../utils/DecodeTokenUtils";

dotenv.config();

export const getUserConversationList = async (req: Request, res: Response) => {
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
    const loggedInUserId = decodeToken(token);
    const conversationLists = await UserChatMessage.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    }).sort({ updatedAt: -1 });

    if (!conversationLists || conversationLists.length === 0) {
      return res.json({ message: "No list found!" });
    }

    const conversationMap = new Map();

    conversationLists.forEach((message) => {
      const senderId = message.senderId.toString();
      const receiverId = message.receiverId.toString();

      // Create a consistent key for each user pair
      const key = [senderId, receiverId].sort().join("-");

      // Only add the message if it's the first one (latest one due to sorting)
      if (!conversationMap.has(key)) {
        conversationMap.set(key, message);
      }
    });

    const newObject = await Promise.all(
      Array.from(conversationMap.values()).map(async (list) => {
        const fetchUserDetails = async (userId: ObjectId) => {
          const userDetails = await User.findById(userId);
          return userDetails ? userDetails : null;
        };

        const sendDetail = await fetchUserDetails(list.senderId);
        const receiveDetail = await fetchUserDetails(list.receiverId);

        return {
          senderDetails: {
            userId: list.senderId,
            userFirstName: sendDetail?.firstname || "",
            userLastName: sendDetail?.lastname || "",
            userProfileImage: null,
          },
          receiverDetails: {
            userId: list.receiverId,
            userFirstName: receiveDetail?.firstname || "",
            userLastName: receiveDetail?.lastname || "",
            userProfileImage: null,
          },
          lastMessage: list.data,
          lastMessageTimeStamps: list.updatedAt,
        };
      })
    );

    return res.status(200).json(newObject);
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).json({ message: (error as Error).message });
  }
};
