const PostUpload = require('../models/PostUpload.js')

module.exports = (req, res) =>{
    // if session contains user id
 
    PostUpload.findOne({}, {}, {sort: {'datePosted' : -1}}, (error, user) => {
        if(user)
            global.num = user.numId + 1
    })

    if(req.session.userId){
        return res.render("writepost");
    }
  
    res.redirect('/login')
}

