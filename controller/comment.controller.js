const Comment = require('../models/Comment.model');
const Drink = require('../models/Drink.model');

const createComment = async (req, res, next) => {
    const postId = req.params.id; 
    console.log('req.body', req.body);
    const comment = await Comment.create({
        body: req.body.bodyContent,
        userId: req.session.currentUser._id
    })

    const commentId = comment._id;

    const updatedPost = await Drink.findByIdAndUpdate(
        postId,
        { $push: { comments: commentId } },
        { new: true } // 
    )
    console.log('updatedPost: ', updatedPost);
    res.redirect(`/drink/${postId}/detail`);

}


module.exports = {
    createComment
}