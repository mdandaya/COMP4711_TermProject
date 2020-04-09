let db = require('../util/database');

// SELECT u.userID, u.image, p.postID, p.subject, p.detail, p.topic, p.date, COUNT(c.postID) AS replies
//         FROM post p
//         LEFT JOIN comment c ON p.postID = c.postID
//         LEFT JOIN user u ON p.userID = u.userID
//         WHERE p.userID = '${id}'
//         GROUP BY postID
//         ORDER BY p.date DESC

function getAllDiscussions(userid) {
    // return db.query('Select * from discussions where userid='+userid);
    let sql = `select d.userid, d.id, d.title, u.url, d.topic, d.body, d.dateposted, COUNT(r.id) as numreply 
                from discussions d 
                LEFT JOIN discussionreply r ON (d.id = r.discussionid) 
                LEFT JOIN users u ON (u.id = d.userid) 
                where d.userid = `+ userid +
        `group by d.userid, d.id, d.title, u.url, d.topic, d.body, d.dateposted;`;
    return db.query(sql);
}

function getOneDiscussion(discId) {
    // return db.query('Select * from discussions where id=' + discId);

    let sql = `select d.userid, d.id, d.title, u.url, d.topic, d.body, d.dateposted, COUNT(r.id) as numreply 
                from discussions d 
                LEFT JOIN discussionreply r ON (d.id = r.discussionid) 
                LEFT JOIN users u ON (u.id = d.userid) 
                where d.id = `+ discId +
        `group by d.userid, d.id, d.title, u.url, d.topic, d.body, d.dateposted;`;
    return db.query(sql);
}

function searchDiscByTitle(query) {
    return db.query("Select * from discussions where UPPER(Title) LIKE UPPER('%" + query + "%')");
}

function addDisc(data) {
    let sql = "Insert into discussions (UserID, Title, Body, Topic) values ('" + data.userID + "','" + data.title + "','" + data.body + "','" + data.topic + "')";
    return db.query(sql);//how to pass user id(fk)?
}


//--------get replies
function getAllReplies(userId, discId) { //userid: different users for replies. disc id: this particular discussion
    return db.query(`Select r.discussionid, u.url, r.body from discussionreply r 
                    INNER JOIN users u ON (u.id = r.userid)
                    where r.userid = ` + userId + ` and r.discussionid = ` + discId);
}

function addReply(userId, discId, content) {

    console.log("===========",userId);
    console.log(discId);
    console.log(content);
    return db.query(
        `INSERT INTO discussionreply
        (userid, discussionid, body)
        VALUES(`+ userId + `, ` + discId + `, '` + content + `');`
    );
}
module.exports = {
    getAllDiscussions: getAllDiscussions,
    searchByTitle: searchDiscByTitle,
    addDisc: addDisc,
    getAllReplies: getAllReplies,
    getOneDiscussion: getOneDiscussion,
    addReply, addReply


}
