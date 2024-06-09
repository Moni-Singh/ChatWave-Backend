import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const decodeToken = (token: string) => {
  try {
    const JWT_SECRET_KEY = "monisingh123"; // Ensure this is the correct key used to sign the token
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { id: ObjectId };

    if (!decodedToken) {
      console.error("Failed to decode token: token is null or undefined");
      return null;
    }

    const decodedId = decodedToken.id;
    return decodedId;
  } catch (error) {
    if ((error as Error).name === "TokenExpiredError") {
      console.error("Token expired:", error);
      return error;
    } else if ((error as Error).name === "JsonWebTokenError") {
      console.error("JWT Error:", (error as Error).message); // Provide detailed JWT error message
      return error;
    } else {
      console.error("Unexpected error during token verification:", error);
      return error;
    }
  }
};
