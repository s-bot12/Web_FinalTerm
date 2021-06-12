const User = require('../models/User.js')
const path = require('path')
const Rank = require('../models/Rank.js')

module.exports = (req,res)=>{
    User.create(req.body, (error, user) => {
        if(error) {

            return res.render('login', {pass : '5'})
        }
        else {

            Rank.create({
                ...req.body,
                name: user.name,
                userid: user._id,
                point: 0,
                gameName: 'tetris'
            })
            res.render('login', {pass : '6'})
        }
    })
}