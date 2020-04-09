let searchModel = require('../models/discData');


exports.searchKeyword = (req, res) => {
    let query = req.query.search;
    let toFind = searchModel.searchByTitle(query);
    toFind.then(data => {
        res.render('search-result', {   helpers: {
            dateTrim: function (date) {
                return date.toString().slice(4, 15);
            },
            isDiscussion: function () { return true; }
        },discussions: data.rows, discussionsCSS: true, navBar: true });
    }).catch(err => console.log(err));
}
//TODO: Handle when Title is null. it should not be null.
