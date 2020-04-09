let model = require('../models/msg-model');

exports.msgNew = function(req,res,next) {
    res.render('msgSend', { msgCSS: true });
}

exports.msgSend = async function(req,res,next) {
    console.log("msgSend request:");
    console.log(req.body);
    
    let subject = req.body.subject;
    let content = req.body.content;
    let user1 = req.body.senderID;
    let user2 = req.body.receiverID;
    
    // check the existance of the conversation
    var check;
    try {
        check = await model.checkConversation(user1, user2, subject);
        if (check.rowCount == 0) {
            model.createConversation(user1, user2, subject, content);
        } else {
            model.createMessage(check.rows[0], content);
        }
    } 
    catch (error) {
        console.log(error);
    }
}

exports.convList = function(req,res,next) {
    res.render('msgList', { msgCSS: true });
}

exports.msgList = function(req,res,next) {
        
}