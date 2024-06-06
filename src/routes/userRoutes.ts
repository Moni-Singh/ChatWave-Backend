const express = require("express");
const { verify } = require("jsonwebtoken");
const user_route = express();


const user_controller = require("../controllers/authController");
const product_controller = require("../controllers/productControllers")
const document_controller = require("../controllers/documentControllers")
const fcmToken_controller = require("../controllers/fcmTokenController")
user_route.use(express.json());
const path = require("path");
// const {verifyToken,isAdmin}= require('../middleware/authmiddleware')


user_route.use(express.static('public'));
user_route.post ('/register',user_controller.registerUser);


user_route.post('/login',user_controller.loginUser);
user_route.get('/logout',user_controller.logoutUser);

user_route.get('/products/:id',product_controller.getProductById);
user_route.post('/products',product_controller.addProduct);
user_route.get('/allProducts',product_controller.getAllProduct);
user_route.delete('/deleteProduct/:id',product_controller.deleteProduct);
user_route.put('/updateProduct/:id',product_controller.updateProduct);

user_route.post('/document',document_controller.addDocument);
user_route.get('/getAllDocument',document_controller.getAllDocument);

user_route.post('/fcmToken',fcmToken_controller.addFCMToken);

export default user_route;