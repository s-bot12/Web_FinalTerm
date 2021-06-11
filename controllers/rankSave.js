const Rank = require('../models/Rank.js')

module.exports = (req,res)=>{ 

    Rank.create({
        ...req.body,
        name: global.name,
        userid: req.session.userId,
        point: req.body.point,
        gameName: req.body.gameName
    })
    res.redirect('/game/tetris.html')
}