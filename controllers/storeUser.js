const User = require('../models/User.js')
const path = require('path')
const Rank = require('../models/Rank.js')

module.exports = (req,res)=>{
    User.create(req.body, (error, user) => {
        if(error) {
            alert('이미 존재하는 아이디 입니다.')
            return res.redirect('/login')
        }
        else {
            alert('회원가입 성공!')
            Rank.create({
                ...req.body,
                name: user.name,
                userid: user._id,
                point: 0,
                gameName: 'tetris'
            })
            res.redirect('/')
        }
    })
}