const PostUpload = require('../models/PostUpload.js')

module.exports = async (req, res) =>{
    const postupload = await PostUpload.find({})
    res.render('community',{
        postupload
    });
}