let db = require('../util/database');

// Add a single individual to the database
function addUser(data) {
    let sql = "INSERT INTO users (firstName, lastName, email, password) VALUES ('" + data.fname + "','"+ data.lname+ "','" + data.email + "','"+ data.password + "')";
    db.query(sql);
}

// Login
function UserAuthAndRedirect(data) {
    //let sql = "SELECT CASE WHEN EXISTS (SELECT ID FROM users WHERE email = '" + data.email + "' AND password = '" + data.password + "') THEN 'Success' ELSE 'Email and Password do not match' END";    
    let sql = "SELECT id, firstname, lastname FROM users WHERE email = '" + data.email + "' AND password = '" + data.password + "'";  
    return db.query(sql);
}

function getUserData(userId) {
    let sql = "SELECT users.id, firstname, lastname, url, about, dob, country, " 
            + "(select count(userid) from discussions where userid = " + userId + ") as posts, "
            + "(select count(user2) from conversation where user2 = " + userId + ") as messages, "
            + "likes "
            + "FROM users "
            + "WHERE users.id = " + userId;
    return db.query(sql);
}

function addLike(userId) {
    let sql = "Update users set likes = likes + 1 where id = " + userId;
    return db.query(sql);
}

module.exports = {
    createUser: addUser,
    login: UserAuthAndRedirect,
    getUserData: getUserData,
    addLike: addLike
    // ,getall : getAllPeople,
    // getpeople: getPeople 
}