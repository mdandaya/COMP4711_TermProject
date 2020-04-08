let db = require('../util/database');

function getAllDiscussions() {
    return db.query('Select * from discussions');
}

function getOneDiscussion(discId){
    return db.query('Select * from discussions where id='+discId);
}

function searchDiscByTitle(query) {
    return db.query("Select * from discussions where UPPER(Title) LIKE UPPER('%" + query + "%')");
}

function addDisc(data) {
    let sql = "Insert into discussions (UserID, Title, Body, Topic) values ('" + data.userID + "','" + data.title + "','" + data.body + "','" + data.topic +"')";
    return db.query(sql);//how to pass user id(fk)?
}


//--------get replies
function getAllReplies(userId,discId) { //userid: different users for replies. disc id: this particular discussion
    return db.query('Select * from discussionreply where userid = '+userId+' and discussionid = '+discId);
}


module.exports = {
    getAllDiscussions: getAllDiscussions,
    searchByTitle: searchDiscByTitle,
    addDisc: addDisc,
    getAllReplies: getAllReplies,
    getOneDiscussion: getOneDiscussion,
  

}