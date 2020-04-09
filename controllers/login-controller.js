
const profileModel = require('../models/profile');

// exports.getAllPeople = (req,res,next) => {
//    let Peoples = peopleModel.getall();
//    let name = req.session.username;
//    Peoples.then( ([rows, fieldData]) => {
//         res.render('peoples', { people: rows, 
//                                 username: name,  
//                                 peoplesCSS: true });
//    });
// };

//from POST /register.  Create user, login, set session id
exports.register = (req, res) => {
    const user = req.body;
    if(req.body.password === req.body.confirm_pass) {
        profileModel.createUser(user)
            .then(()=> {
                //create user in db and login in right away to set req.session.userId
                profile.addUser(user)
                    .then(([data, fieldData]) => {
                        if (data[0] && data[0][0] && data[0][0].ID) {
                            req.session.userId = data[0][0].ID
                        }
                        res.redirect(301, `/profile`);
                    })
            })
            .catch((err)=>{
                console.log(err)
                res.redirect(403, '/');
            })
    } else {
        res.render('login', { err: "Credentials do not match database"})
    }
}

//from POST /register.  Create user, login, set session id
exports.login = (req, res, next) => {
    console.log("TEST");
    profileModel.login(req.body).then((data) => {
        if (data.rows[0] && data.rows[0].id && data.rows[0].firstname && data.rows[0].lastname) {
            req.session.userID = data.rows[0].id;
            req.session.firstname = data.rows[0].firstname;
            req.session.lastName = data.rows[0].lastname;
            console.log(req.session);
            res.redirect('/homepage');
        } else {
            console.log("ERROR");
            res.render('login', {layout: 'signUp', err: 'Wrong password or email'})
        }
    })
    .catch((err) => {
        console.log(err)
    })
}