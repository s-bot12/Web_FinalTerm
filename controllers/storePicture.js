const User = require('../models/User.js')
const path = require('path')

module.exports = (req,res)=>{ 
    let image = req.files.image;  
    image.mv(path.resolve(__dirname,'..','public/img',image.name),async (error)=>{
        await User.update({ name: global.name }, {
            image: '/img/' + image.name,
        }).setOptions({ runValidators: true })
        .exec()
    })         
    res.redirect('/mypage')
}

