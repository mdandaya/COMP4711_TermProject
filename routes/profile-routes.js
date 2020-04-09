const express = require('express');
const profileController = require('../controllers/profile-controller');
const router = express.Router();

router.get('/profile/:userid', profileController.getProfile);

router.post('/profile/:userid/like', profileController.addLike);

module.exports = router;
