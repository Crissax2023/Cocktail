const express = require('express');
const userRouter = express.Router();
const{
getSignup,
postSignup,
getProfile,
getLogin,
postLogin
}=require('../controllers/auth.controller')

userRouter.get('/signup',getSignup)


userRouter.post('/signup',postSignup)




userRouter.get('/profile',getProfile)




userRouter.get('/login', getLogin)
userRouter.post('/login', postLogin)


module.exports = userRouter;