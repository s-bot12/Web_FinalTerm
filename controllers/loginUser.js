const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) =>{
    const { mail, password } = req.body;

    User.findOne({mail:mail}, (error,user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    req.session.userId=user._id
                    global.mail = user.mail
                    global.name = user.name
                    if(!user.image) {
                        user.image = "/img/photo1.jpg"
                    }
                    global.image = user.image;
                    res.redirect('/auth/login')
                }
                else{
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
}