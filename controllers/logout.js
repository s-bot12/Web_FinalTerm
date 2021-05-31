module.exports = (req, res) =>{
    req.session.destroy(() =>{
      res.redirect('/auth/login')
    }) 
  }
  
  // destroy all session data including user id