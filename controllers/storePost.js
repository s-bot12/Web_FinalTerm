const PostUpload = require('../models/PostUpload.js')
const path = require('path');

module.exports = (req,res)=>{ 
    let image;
    if(!(req.files && req.files.image)) {
        image = 10; //default
        image.name = "logo.png";
    }
    else {
        image = req.files.image;
        image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{}) 
    }

    PostUpload.create({
        ...req.body,
        image: '/img/' + image.name,
        userid: req.session.userId,
        username: global.name,
        numId: global.num
    })
    res.redirect('/community')

}