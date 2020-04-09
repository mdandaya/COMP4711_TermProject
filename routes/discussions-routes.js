const express = require('express');
const router = express.Router();
const discController = require('../controllers/discussion-controller');

router.get('/discussions/replies/:userId/:discussionId', discController.getAllreplies);

router.post('/new-reply/:discussionId', discController.postNewReply);




module.exports = router;