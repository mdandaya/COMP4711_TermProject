let discModel = require('../models/discData');
let profileModel = require('../models/profile');

exports.getProfile = async (req, res, next) => {
    let userId = req.params.userid;

    let data = discModel.getAllDiscussions(userId);
    let userRow = await profileModel.getUserData(userId);
    let user = userRow.rows[0];
    console.log(user);

    res.render('profile', { profileCSS: true , profile: user});
}

exports.addLike = async(req, res, next) => {
    let userId = req.params.userid;
    await profileModel.addLike(userId);
    res.redirect('/profile/' + userId);
}