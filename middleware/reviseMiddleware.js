const User = require('../models/User')

module.exports = (req, res, next) => {    
  User.findOne({mail: global.mail}, (error,user) => {
    if (user) {
       global.image = user.image;
    }
    next();
})
}