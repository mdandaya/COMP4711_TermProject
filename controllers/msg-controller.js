let model = require('../models/msg-model');

exports.msgNew = function(req,res,next) {
    res.render('msgSend', { msgCSS: true, receiverID: req.body.receiverID });
}

exports.msgSend = async function(req,res,next) {
    console.log("msgSend request:");
    console.log(req.body);
    
    let subject = req.body.subject;
    let content = req.body.content;
    let user1 = req.session.userid;
    let user2 = req.body.receiverID;
    
    // check the existance of the conversation
    var check;
    try {
        check = await model.checkConversation(user1, user2, subject);
        if (check.rowCount == 0) {
            await model.createConversation(user1, user2, subject)
            check = await model.checkConversation(user1, user2, subject);
        }
        await model.createMessage(check.rows[0].id, user1, content);
    } 
    catch (error) {
        console.log(error);
    }

    // send user back to the counter-party's profile page
    res.render('profile', { profileCSS: true });
}

exports.convList = async function(req,res,next) {
    var conversations = await model.conversationList(req.session.userID);
    var myConversations = [];

    conversations.rows.forEach(function (row) {
        if (req.session.firstname == row.u1first && req.session.lastname == row.u1last) {
            myConversations.push({convid: row.id, subject: row.subject, firstname: row.u1first, lastname: row.u1last});
        } else {
            myConversations.push({convid: row.id, subject: row.subject, firstname: row.u2first, lastname: row.u2last});
        }
    });

    res.render('msgList', { msgCSS: true, conversations: myConversations });
}

exports.msgList = async function(req,res,next) {
    var msgs = await model.msgList(req.body.convid);
    console.log(msgs.rows);
    res.render('partials/msgs', {msgs: msgs.rows, layout: false});
}