const commentRouter = require("express").Router();
const { 
    createComment
} = require('../controller/comment.controller')
const isLoggedIn = require('../middleware/isLoggedIn');

commentRouter.post('/create/:id', isLoggedIn, createComment)


module.exports = commentRouter;