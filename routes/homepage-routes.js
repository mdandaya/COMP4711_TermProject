const express = require('express');
const homepageController = require('../controllers/homepage-controller');
const router = express.Router();

router.get('/homepage', homepageController.getHomepage);

router.post('/homepage/post', homepageController.postToTimeLine);

module.exports = router;
