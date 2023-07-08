const isLoggedIn = (req,res,next) =>{
    
    if(!req.session.currentUser)
    {
        return res.redirect('/auth/login')

    }
    else if(req.session.currentUser){

        req.app.locals.isLoggedIn = true

    }else
    {
        req.app.locals.isLoggedIn = false
    }
    next()

}


 const isLoggedOut = (req,res,next)=>{
    if(req.session.currentUser)
    {
        return res.redirect('/user/profile')
    }
    next()
 }

 module.exports = {
    isLoggedIn,
    isLoggedOut 

 }