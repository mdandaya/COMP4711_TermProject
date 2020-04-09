const express = require('express');

const loginController = require('../controllers/login-controller');
const router = express.Router();



// router.get('/login', loginController.logout);

router.get('/search', searchController.searchKeyword);

module.exports = router;
