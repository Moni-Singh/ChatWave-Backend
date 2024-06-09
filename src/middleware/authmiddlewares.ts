import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import { IUserRequest } from "../models/User"; // Adjust the import path as needed

export const protect = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        const JWT_SECRET = process.env.JWT_SECRET || "monisingh123";
        token = req.headers.authorization.split(" ")[1];
        const decodeToken: any = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", decodeToken);

        const user = await User.findById(decodeToken.id).select("-password");
        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }

        req.user = user; // Adding user to req
        req.userId = decodeToken.id; // Adding userId to req

        next();
      } catch (error: any) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
