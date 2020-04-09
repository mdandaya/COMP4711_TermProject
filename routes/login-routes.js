const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login-controller');

const homepageController = require('../controllers/homepage-controller');

router.post('/login', loginController.login);

router.post('/register', loginController.register);

router.get('/homepage', homepageController.getHomepage);



module.exports = router;
