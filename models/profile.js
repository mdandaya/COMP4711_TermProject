let db = require('../util/database');

// Add a single individual to the database
function addUser(data) {
    let sql = "INSERT INTO users (firstName, lastName, email, password) VALUES ('" + data.fname + "','"+ data.lname+ "','" + data.email + "','"+ data.password + "')";
    db.query(sql);
}

// Login
function UserAuthAndRedirect(data) {
    //let sql = "SELECT CASE WHEN EXISTS (SELECT ID FROM users WHERE email = '" + data.email + "' AND password = '" + data.password + "') THEN 'Success' ELSE 'Email and Password do not match' END";    
    let sql = "SELECT ID FROM users WHERE email = '" + data.email + "' AND password = '" + data.password + "'";    
    return db.query(sql);
}

module.exports = {
    createUser : addUser,
    login : UserAuthAndRedirect
    // ,getall : getAllPeople,
    // getpeople: getPeople 
}
