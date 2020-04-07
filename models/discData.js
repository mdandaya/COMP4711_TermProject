let db = require('../util/database');

function getAllDiscussions() {
    return db.query('Select * from discussions');
}

function searchDiscByTitle(query) {
    return db.query("Select * from discussions where UPPER(Title) LIKE UPPER('%" + query + "%')");
}

function addDisc(data) {
    let sql = "Insert into discussions (UserID, Title, Body, Topic) values ('" + data.userID + "','" + data.title + "','" + data.body + "','" + data.topic +"')";
    return db.query(sql);//how to pass user id(fk)?
}




module.exports = {
    getAllDiscussions: getAllDiscussions,
    searchByTitle: searchDiscByTitle,
    addDisc: addDisc

}