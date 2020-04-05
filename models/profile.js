//let db = require('../util/database');

// Add a single individual to the database
function addUser(data) {
    let sql = "insert into users (firstName, lastName, email, password) values ('" + data.fname + "','"+ data.lname+ "','" + data.email + "','"+ data.password + "')";
    db.query(sql);
}

// // Gets all the individuals in the database
// function getAllPeople() {
//     return db.execute('Select * from people');
// }

// // Gets a specific individual from the database
// function getPeople(id) {
//     return db.execute("Select * from people where id = " + id);
// }

module.exports = {
    createUser : addUser
    // ,getall : getAllPeople,
    // getpeople: getPeople 
}
