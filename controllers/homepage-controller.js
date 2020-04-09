let discussionModel = require('../models/discData');

exports.getHomepage = async (req, res, next) => {
    res.render('homepage', { homepageCSS: true, discussionsCSS: true });
}

exports.postToTimeLine = async (req, res, next) => {
    
    // Hardcoded Test Post
    // let disc = {
    //     userID: 2, // <- user named evan
    //     title: "test discussion",
    //     body: "this is to test the post to discussion method",
    //     topic: "php"
    // }

    let disc = {
        userID: 2,
        title: req.body.subject,
        body: req.body.details,
        topic: req.body.topic
    }

    await discussionModel.addDisc(disc);
    res.redirect(301, '/');
}