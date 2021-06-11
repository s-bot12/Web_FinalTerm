const Rank = require('../models/Rank.js')

module.exports = async (req,res) => {

    const rank = await Rank.find({}, {}, {sort: {'point' : -1}})

    res.render('ranking-detail',{
        rank
    });

}
