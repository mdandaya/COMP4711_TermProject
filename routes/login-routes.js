const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login-controller');

router.post('/register', loginController.register);

// router.post('/index', loginController.authenticate);

module.exports = router;
