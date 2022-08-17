const express = require('express');

const chatRoutes=express.Router();

const authMiddleware=require('../auth/auth');

const chatController=require('../controllers/chat');

chatRoutes.post('/chat',authMiddleware.verifyToken, chatController.postChat);

chatRoutes.get('/',authMiddleware.verifyToken,chatController.getChats);

module.exports=chatRoutes;