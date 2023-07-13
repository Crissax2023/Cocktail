const { Schema, model } = require('mongoose');

const imagePostSchema = new Schema(
    {
        title: {
            type: String,
            required: false,
            trim: true,
        },
        content: String,
        imageName: {
            type: String,
            default: 'A picture'
        },
        imageUrl: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        comments: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Comment',
            },
        ],
    }
)

module.exports = model('ImagePost', imagePostSchema);