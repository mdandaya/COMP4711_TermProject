// const auth = require('../models/loginData');

// const artistsModel = require('../models/artistData');
// exports.authenticate = (req, res) => {
//     console.log(req.body);
//     let user = req.body.uid
//     let pwd = req.body.pwd;
//     let allArtists = artistsModel.getall();
//     if (auth.authenticate(user, pwd)) {
//         console.log("Login Success");
//         allArtists.then(data => {
//             res.render('HOMEPAGE', { HOMEPAGE_CSS: true, artists: data.rows });
//         }).catch((err) => console.log(err))

//     } else {
//         console.log('login fail');
//         res.render('login', { loginCSS: true, fail: true });
//     }
// }

// exports.logout = (req, res) => {
//     res.redirect(301, '/');
// }

