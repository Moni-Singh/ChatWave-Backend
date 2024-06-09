const express = require("express");
const { verify } = require("jsonwebtoken");
const user_route = express();

const user_controller = require("../controllers/authController");
const fcmToken_controller = require("../controllers/fcmTokenController")
const product_controller = require("../controllers/productControllers");
const document_controller = require("../controllers/documentControllers");
const regiseterUserList_controller = require("../controllers/userList");

const messageContent_controller = require("../controllers/MessageContentController/MessageContentController");
const userChatMessage_controller = require("../controllers/MessageContentController/UserChatMessageController");
const userConversationList_controller = require("../controllers/MessageContentController/UserConversationController");
user_route.use(express.json());
const path = require("path");
// const {verifyToken,isAdmin}= require('../middleware/authmiddleware')

user_route.use(express.static("public"));
user_route.post("/register", user_controller.registerUser);

user_route.post("/login", user_controller.loginUser);
user_route.get("/logout", user_controller.logoutUser);

user_route.get("/products/:id", product_controller.getProductById);
user_route.post("/products", product_controller.addProduct);
user_route.get("/allProducts", product_controller.getAllProduct);
user_route.delete("/deleteProduct/:id", product_controller.deleteProduct);
user_route.put("/updateProduct/:id", product_controller.updateProduct);

user_route.post("/document", document_controller.addDocument);
user_route.get("/getAllDocument", document_controller.getAllDocument);

//get userList
user_route.get("/userList", regiseterUserList_controller.getAllUserList);
user_route.get("/userList/:id");

//ChatMessage

user_route.post('/fcmToken',fcmToken_controller.addFCMToken);
user_route.post("/sendMessage", messageContent_controller.addMesssageContent);
user_route.post("/chat/message", userChatMessage_controller.userChatMessage);

//get ChatMessage
user_route.post(
  "/chat/getMessage",
  userChatMessage_controller.getChatMessageById
);

user_route.get(
  "/user/conversationList",
  userConversationList_controller.getUserConversationList
);

export default user_route;
