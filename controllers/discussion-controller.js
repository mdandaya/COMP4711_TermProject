let discData = require('../models/discData');


exports.getAllreplies = (req, res) => {
    
    let allreplies = discData.getAllReplies(req.param.discussionId);
    allreplies.then(data => {
        res.render('disc-replies', { repliesCSS: true, replies: data.rows , numberOfReplies: data.rows.length});
        //TODO: render(disc-replies.hbs )
    }).catch(err => console.log(err));
};


