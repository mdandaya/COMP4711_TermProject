let discModel = require('../models/discData');

exports.getHomepage = async (req, res, next) => {

    let userId = req.session.userID;
    let data = discModel.getAllDiscussions(userId);

    //let numberOfReplies = discController.getNumOfReplies(); TODO: number of reply UNDEFINED
    data.then(data => {
        let paginationArr = helperPagination(data.rows, 5);

        let numberOfPages = paginationArr.length;
        res.render('homepage', {
            helpers: {
                numberOfReplies: function () { return 999; },
                dateTrim: function (date) {
                    return date.toString().slice(4, 15);
                },
                incrementPage: function (page) { return --page; },
                decrementPage: function (page) { return ++page; },
                isDiscussion: function () { return true; }
            },
            homepageCSS: true, discussions: paginationArr[0]         //TODO:fix this
        });

    }).catch(err => console.log(err));



}

exports.getHomepageNext = async (req, res, next) => {


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

function helperPagination(arr, size) {
    var newarr = [];
    for (var i = 0; i < arr.length; i += size) {
        newarr.push(arr.slice(i, i + size));
    }
    return newarr;
}