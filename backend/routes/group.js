const express=require('express');

const groupRoutes=express.Router();

const authMiddleware=require('../auth/auth');
const groupController=require('../controllers/group');

groupRoutes.post('/create-group',authMiddleware.verifyToken,groupController.createGroup);

groupRoutes.get('/get-groups',authMiddleware.verifyToken,groupController.getGroups);

groupRoutes.post('/add-usertogroup',authMiddleware.verifyToken,groupController.addUserToGroup);

module.exports=groupRoutes;

