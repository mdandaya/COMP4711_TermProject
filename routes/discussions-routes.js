const express = require('express');
const router = express.Router();
const discController = require('../controllers/discussion-controller');

router.get('/discussions/replies/:discussionId', discController.getAllreplies);

//get one discussion => for fetching replies



module.exports = router;