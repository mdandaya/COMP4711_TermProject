// need user and discussion models here

exports.getProfile = async (req, res, next) => {
    let userID = req.params.userid;
    res.render('profile', { profileCSS: true, receiverID: userID });
}