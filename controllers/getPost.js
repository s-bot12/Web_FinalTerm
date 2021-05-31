const PostUpload = require('../models/PostUpload.js')
module.exports = async (req,res) => {
    const postupload =  await PostUpload.findById(req.params.id).populate('userid')

        await PostUpload.update({_id : req.params.id},{
            views: postupload.views+1
        }).setOptions({ runVlidators: true}).exec()

        res.render('community-detail',{
            postupload
        })
}