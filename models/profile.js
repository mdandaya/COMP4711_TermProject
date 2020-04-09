let db = require('../util/database');

// Add a single individual to the database
function checkForUserEmail(data) {
    let sql = "SELECT id FROM users WHERE email = '" + data.email + "'";
    return db.query(sql);
}

// Add a single individual to the database
function addUser(data) {
    console.log(Math.ceil(Math.random() * 2))
    let randURL = "";
    if (Math.ceil(Math.random() * 2) == 1) {
        randURL = "https://randomuser.me/api/portraits/men/" + Math.ceil(Math.random() * 75) + ".jpg";
    } else {
        randURL = "https://randomuser.me/api/portraits/women/" + Math.ceil(Math.random() * 75) + ".jpg";
    }
    let sql_insert = "INSERT INTO users (firstName, lastName, email, password, url) SELECT '" + data.fname + "','" + data.lname + "','" + data.email + "','" + data.password + "','" + randURL + "' WHERE NOT EXISTS (SELECT * FROM users WHERE email = '" + data.email + "')";
    return db.query(sql_insert);
}

// Login
function UserAuthAndRedirect(data) {
    //let sql = "SELECT CASE WHEN EXISTS (SELECT ID FROM users WHERE email = '" + data.email + "' AND password = '" + data.password + "') THEN 'Success' ELSE 'Email and Password do not match' END";    
    let sql = "SELECT id, firstname, lastname FROM users WHERE email = '" + data.email + "' AND password = '" + data.password + "'";
    return db.query(sql);
}

function getUserData(userId) {
    let sql = "SELECT users.id, firstname, lastname, email, url, about, dob, country, "
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

function updateUser(userID, firstname, lastname, email, about, url) {
    let sql = `Update users set firstname = '` + firstname +
        `', lastname = '` + lastname + `', email = '` + email + `', about = '` + about + `', url = '` + url + 
        `' where id = ` + userID;
    return db.query(sql);
}


module.exports = {
    createUser: addUser,
    login: UserAuthAndRedirect,
    checkIfUserExists: checkForUserEmail,
    getUserData: getUserData,
    addLike: addLike,
    updateUser: updateUser
}