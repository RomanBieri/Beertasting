// backend/beertasting-app/backend/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// Route für die Registrierung 
router.post('/register', authController.register);

// Route für den Login
router.post('/login', authController.login);

module.exports = router;