let model = require('../models/msg-model');

exports.msgNew = function(req,res,next) {
    res.render('msgSend', { msgCSS: true });
}

exports.msgSend = function(req,res,next) {
        
}

exports.convList = function(req,res,next) {
    res.render('msgList', { msgCSS: true });
}

exports.msgList = function(req,res,next) {
        
}