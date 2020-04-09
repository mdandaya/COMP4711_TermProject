let discData = require('../models/discData');


exports.getAllreplies = async (req, res) => {//TODO:is this okay?
    let discussId = req.params.discussionId;
    let userId = req.params.userId;
    try {
        let allreplies = await discData.getAllReplies(userId, discussId);
        console.log(discussId, "discuss id");
        let getOneDiscussion = await discData.getOneDiscussion(discussId);
        console.log(allreplies.rows, "Replies--");
        res.render('disc-replies', {
            helpers: {
                numberOfReplies: function () { return 999; },
                dateTrim: function (date) {
                    return date.toString().slice(4, 15);
                },
                // isDiscussion: function () { return false; }
            }, discussionsCSS: true, replies: allreplies.rows, discussions: getOneDiscussion.rows, replyView: true
        });
    } catch (err) {
        console.log(err);
    }

    // allreplies.then(data => {


    // }).catch(err => console.log(err));
};

exports.getNumOfReplies = (req, res) => {
    let num = discData.getAllReplies(req.params.discussionId);
    allreplies.then(data => {
        res.send(data.length);
    }).catch(err => console.log(err));
}





