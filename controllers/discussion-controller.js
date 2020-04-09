let discData = require('../models/discData');


exports.getAllreplies = async (req, res) => {//TODO:
    let discussId = req.params.discussionId;
    let userId = req.params.userId;
    try {
        let getOneDiscussion = await discData.getOneDiscussion(discussId);
        let allreplies = await discData.getAllReplies(userId, discussId);


        res.render('disc-replies', {
            helpers: {
                dateTrim: function (date) {
                    return date.toString().slice(4, 15);
                },
                getDiscId: function () {
                    return discussId;
                }
                // isDiscussion: function () { return false; }
            }, discussionsCSS: true, replies: allreplies.rows, discussions: getOneDiscussion.rows, replyView: true
        });
    } catch (err) {
        console.log(err);
    }

};

exports.postNewReply = async (req, res) => {
    let userId = req.session.userID;
    let discId = req.params.discussionId;
    let content = req.body.newReply;
  
    try {
      
        let success = await discData.addReply(userId, discId, content);
        console.log(success);
        res.redirect(301, '/discussions/replies/' + userId + '/' + discId);

    } catch (err) {
        console.log(err, "whoa");
    }
};

