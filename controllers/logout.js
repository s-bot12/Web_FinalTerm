module.exports = (req, res) =>{
    req.session.destroy(() =>{
      res.redirect('/login')
    }) 
  }
  
  // destroy all session data including user id