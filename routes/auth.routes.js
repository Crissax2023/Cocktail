const express = require('express');
const userRouter = express.Router();
const{
getSignup,
postSignup,
getProfile,
getLogin,
postLogin
}=require('../controllers/auth.controller')

const{    isLoggedIn,    isLoggedOut} = require('../middleware/guard-auth.middleware')

userRouter.get('/signup',isLoggedOut,getSignup)


userRouter.post('/signup',postSignup)




userRouter.get('/profile',isLoggedIn,getProfile)




userRouter.get('/login', getLogin)
userRouter.post('/login', postLogin)


userRouter.get('/logout',(req,res,next)=>
{
     req.session.destroy((err)=>{
        if(err)
        {
            return next(err)
        }
        res.redirect('/auth/profile')
     })
})

module.exports = userRouter;