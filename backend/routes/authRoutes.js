const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/adm', authController.login);

module.exports = router;
