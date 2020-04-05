const express = require('express');
const artistController = require('../controllers/artistsController');
const loginController = require('../controllers/loginController');
const router = express.Router();



// router.get('/login', loginController.logout);

router.get('/search', searchController.searchKeyword);

module.exports = router;
