let discData = require('../models/discData');


exports.getAllreplies = async (req, res) => {//TODO:is this okay?
    let discussId = req.params.discussionId
    try{
        let allreplies = await discData.getAllReplies(discussId);
        console.log(discussId,"discuss id");
        let getOneDiscussion = await discData.getOneDiscussion(discussId);
        console.log(allreplies.rows,"Replies--");
        res.render('disc-replies', {repliesCSS: true, replies: allreplies.rows, discussions: getOneDiscussion, replyView: true});
    }catch(err){
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





