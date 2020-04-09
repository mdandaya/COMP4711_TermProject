const express = require('express');

const searchController = require('../controllers/search-controller');
const router = express.Router();



// router.get('/login', loginController.logout);

router.get('/search', searchController.searchKeyword);

module.exports = router;
