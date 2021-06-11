const Rank = require('../models/Rank.js')

module.exports = async (req, res) => {

    const rank = await Rank.findOne({ name: global.name }, {}, { sort: { 'point': -1 } })

    res.render('mypage', {
        rank
    })
}





