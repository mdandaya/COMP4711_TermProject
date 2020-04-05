const express = require('express');
const router = express.Router();
const msgController = require('../controllers/msg-controller');

router.get('/msgNew', msgController.msgNew);
router.post('/msgSend', msgController.msgSend);
router.get('/convList', msgController.convList);
router.get('/msgList', msgController.msgList);

module.exports = router;
