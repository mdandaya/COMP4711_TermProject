const express = require('express');
const homepageController = require('../controllers/homepage-controller');
const router = express.Router();

router.get('/homepage', homepageController.getHomepage);

router.post('/homepage/post', homepageController.postToTimeLine);

router.get('/homepage/editprofile', homepageController.getEditProfile);

router.post('/homepage/editprofile', homepageController.postEditProfile);

module.exports = router;
