const express = require('express');

const adminRoutes = express.Router();

const adminController = require('../controllers/admin');
const authMiddleware=require('../auth/auth');

adminRoutes.post('/signup', adminController.signup);

adminRoutes.post('/login', adminController.login);

adminRoutes.get('/get-users', authMiddleware.verifyToken,adminController.getUsers);

module.exports = adminRoutes;