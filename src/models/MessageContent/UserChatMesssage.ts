import mongoose, { Schema, Model } from "mongoose";

// Define an interface for the UserChatMessage schema
interface IUserChatMessage {
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  data: string;
  messageType: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extend mongoose.Document with IUserChatMessage
type IUserChatMessageDocument = IUserChatMessage & mongoose.Document;

// Define the schema using Mongoose
const userChatMessageSchema: Schema<IUserChatMessageDocument> = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null,
    },
    data: { type: String, required: true, default: null },
    messageType: { type: String, required: true },
  },
  { timestamps: true }
);
// Create the model using the defined schema
const UserChatMessage: Model<IUserChatMessageDocument> =
  mongoose.model<IUserChatMessageDocument>(
    "UserChatMessage",
    userChatMessageSchema
  );

export default UserChatMessage;
