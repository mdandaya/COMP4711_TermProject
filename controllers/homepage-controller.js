let discModel = require('../models/discData');
let profileModel = require('../models/profile');

exports.getHomepage = async (req, res, next) => {

    let userId = req.session.userID;
    let discSize = req.session.numDiscussions;
    let numDisc = await discModel.getNumDiscussion(userId);



    let data = discModel.getAllDiscussions(userId);
    let userRow = await profileModel.getUserData(userId);
    let user = userRow.rows[0];
    console.log(user);
  
    let currentPage = req.params.page > 0 ? req.params.page : 0;
    let newarr = [];
    newarr.push(currentPage);
    newarr.push(numDisc.rows);
    console.log("newarr====", newarr);
  
    data.then(data => {
        let paginationArr = helperPagination(data.rows, 5);

        let numberOfPages = paginationArr.length;
        res.render('homepage', {
            helpers: {
                dateTrim: function (date) {
                    return date.toString().slice(4, 15);
                },
                getDiscNum: function (newarr) {
                    return newarr;
                }

                // isDiscussion: function () { return true; }
            },

            homepageCSS: true, discussions: data.rows      //TODO:fix this

        });

    }).catch(err => console.log(err));



}

exports.getEditProfile = async (req, res, next) => {
    let userId = req.session.userID;
    let userRow = await profileModel.getUserData(userId);
    let user = userRow.rows[0];
    console.log(user)
    res.render('editprofile', { user: user });
}

exports.postEditProfile = async (req, res, next) => {
    console.log("----------------------");
    console.log(req.body);
    let newInfo = req.body;
    await profileModel.updateUser(req.session.userID, newInfo.fname, newInfo.lname, newInfo.email, newInfo.about, newInfo.imageurl);
    res.redirect('/homepage');
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
        userID: req.session.userID,
        title: req.body.subject,
        body: req.body.details,
        topic: req.body.topic
    }

    await discModel.addDisc(disc);
    res.redirect(301, '/homepage');
}

function helperPagination(arr, size) {
    var newarr = [];
    for (var i = 0; i < arr.length; i += size) {
        newarr.push(arr.slice(i, i + size));
    }
    return newarr;
}