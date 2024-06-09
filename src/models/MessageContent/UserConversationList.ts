import mongoose, { Schema, Document } from "mongoose";

export interface IUserConversationList extends Document {
  users: mongoose.Schema.Types.ObjectId[];
  messages: mongoose.Schema.Types.ObjectId[];
}

const UserConversationListSchema: Schema<IUserConversationList> =
  new Schema<IUserConversationList>({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UserChatMessage" },
    ],
  });

const UserConversationList = mongoose.model<IUserConversationList>(
  "UserConversationList",
  UserConversationListSchema
);

export default UserConversationList;
