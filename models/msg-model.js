let db = require('../util/database');

function checkConversation(user1, user2, subject) {
    let sql = 'SELECT id FROM conversation WHERE ((user1 = $1 AND user2 = $2) OR (user2 = $1 AND user1 = $2)) AND subject = $3';    
    return db.query(sql, [user1, user2, subject]);
}

function createConversation(user1, user2, subject, message) {
    let sql = 'INSERT INTO conversation (user1, user2, subject) VALUES ($1, $2, $3)';
    db.query(sql, [user1, user2, subject]);
}

function createMessage(id, content) {
    let sql = 'INSERT INTO message (convid, content, timestamp) values ($1, $2, current_timestamp)';
    db.query(sql, [id, content]);
}

function conversationList(myID) {
    let sql = 'SELECT c.subject, u1.firstname as u1first, u1.lastname as u1last, \
    u2.firstname as u2first, u2.lastname as u2last \
    FROM conversation c \
    JOIN users u1 ON c.user1 = u1.id \
    JOIN users u2 ON c.user2 = u2.id \
    WHERE user1 = $1 OR user2 = $1';
    return db.query(sql, myID);
}

function messageList(convID) {
    let sql = 'SELECT * FROM message WHERE convid = $1';
    return db.query(sql, convID);
}

module.exports = {
   checkConversation : checkConversation,
   createConversation : createConversation,
   createMessage : createMessage,
   conversationList : conversationList,
   messageList : messageList
}