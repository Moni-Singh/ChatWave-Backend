import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  chatName: { type: String, required: true },
  chatDescription: { type: String, required: true },
  chatProfilePic: { type: String },
  groupChat: { type: Boolean, required: true },
  chatStatus: { type: Boolean, required: true },
  isDeleted: { type: Boolean, required: true },
});

const chatMessage = mongoose.model("messageContent", chatMessageSchema);

module.exports = chatMessage;
