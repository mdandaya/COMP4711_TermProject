let model = require('../models/msg-model');

exports.msgNew = function(req,res,next) {
    res.render('msgSend', { msgCSS: true });
}

exports.msgSend = async function(req,res,next) {
    console.log("msgSend request:");
    console.log(req.body);
    
    let subject = req.body.subject;
    let content = req.body.content;
    let user1 = req.session.userid;
    let user2 = req.params.userid;
    
    // check the existance of the conversation
    var check;
    try {
        check = await model.checkConversation(user1, user2, subject);
        if (check.rowCount == 0) {
            await model.createConversation(user1, user2, subject)
            check = await model.checkConversation(user1, user2, subject);
        }
        await model.createMessage(check.rows[0].id, content);
    } 
    catch (error) {
        console.log(error);
    }

    // send user back to the counter-party's profile page
    res.render('profile', { profileCSS: true });
}

exports.convList = async function(req,res,next) {
    var conversations = await model.conversationList(req.session.userID);
    console.log(conversations.rows);

    var tempArray = [];

    conversations.rows.forEach( function (row) {
        if (req.session.firstname == row.u1first && req.session.lastname == row.u1last) {
            tempArray.push({subject: row.subject, firstname: row.u1first, lastname: row.u1last});
        } else {
            tempArray.push({subject: row.subject, firstname: row.u2first, lastname: row.u2last});
        }
    });

    res.render('msgList', { msgCSS: true, conversations: tempArray });
}

exports.msgList = function(req,res,next) {
        
}