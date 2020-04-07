let db = require('../util/database');

function checkConversation(user1, user2, subject) {
    let sql = 'SELECT id FROM conversation WHERE ((user1 = $1 AND user2 = $2) OR (user2 = $1 AND user1 = $2)) AND subject = $3';    
    return db.query(sql, [user1, user2, subject]);
}

async function createConversation(user1, user2, subject, message) {
    let sql = 'INSERT INTO conversation (user1, user2, subject) VALUES ($1, $2, $3)';
    await db.query(sql, [user1, user2, subject]);
    let id = checkConversation(user1, user2, subject);
    createMessage(id, message); 
}

function createMessage(id, content) {
    let sql = 'INSERT INTO message (convid, content, timestamp) values ($1, $2, current_timestamp)';
    db.query(sql, [id, content]);
}

function conversationList() {
   return db.query('Select * from artists');
}

function messageList() {
    return db.query('Select * from artists');
}

module.exports = {
   checkConversation : checkConversation,
   createConversation : createConversation,
   createMessage : createMessage
}