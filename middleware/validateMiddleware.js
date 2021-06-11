module.exports = (req,res,next)=>{    
    if(req.body.title == null || req.body.body == null){      
        return res.redirect('/posts/new')
    }    
    next()
} // 제목과 내용은 필수적으로 써야함