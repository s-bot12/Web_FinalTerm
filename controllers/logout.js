module.exports = (req, res) =>{
    req.session.destroy(() =>{
      res.render('login', {pass : '4'})
    }) 
  }
  
  // destroy all session data including user id