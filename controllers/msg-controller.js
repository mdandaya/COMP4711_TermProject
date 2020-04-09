let model = require('../models/msg-model');
var email = require('../util/email');

exports.msgNew = function(req,res,next) {    
    res.render('msgSend', { msgCSS: true, receiverID: req.query.receiverID });
}

exports.msgSend = async function(req,res,next) {    
    
    var subject = req.body.subject;
    var content = req.body.content;
    var user1 = req.session.userID;
    var user2 = req.body.receiverID;
    
    // check the existance of the conversation
    var check;
    try {
        check = await model.checkConversation(user1, user2, subject);
        if (check.rowCount == 0) {
            await model.createConversation(user1, user2, subject);
            check = await model.checkConversation(user1, user2, subject);            
            let emailInfo = await model.getEmailInfo(check.rows[0].id);            
            email.sendEmail(emailInfo.rows[0].email, emailInfo.rows[0].firstname + " " + emailInfo.rows[0].lastname);
        }
        await model.createMessage(check.rows[0].id, user1, content);
    } 
    catch (error) {
        console.log(error);
    }

    // send user back to the counter-party's profile page
    res.redirect('../profile/' + user2);
}

exports.convList = async function(req,res,next) {
    var conversations = await model.conversationList(req.session.userID);
    var myConversations = [];

    conversations.rows.forEach(function (row) {
        if (req.session.firstname == row.u1first && req.session.lastname == row.u1last) {
            myConversations.push({convid: row.id, subject: row.subject, firstname: row.u1first, lastname: row.u1last, url: row.u1url});
        } else {
            myConversations.push({convid: row.id, subject: row.subject, firstname: row.u2first, lastname: row.u2last, url: row.u2url});
        }
    });
    
    res.render('msgList', { msgCSS: true, conversations: myConversations });
}

exports.msgList = async function(req,res,next) {
    var msgs = await model.msgList(req.body.convid);
    console.log(msgs.rows);
    res.render('partials/msgs', {msgs: msgs.rows, layout: false});
}