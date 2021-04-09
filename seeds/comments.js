const { Comment } = require('../models');

const commentData = [
    {
        "comment": "I just learned about this in my class!",
        "post_id": 2,
        "user_id": 2
    },
    {
        "comment": "Have you learned about ORMs in your class yet?",
        "post_id": 1,
        "user_id": 1
    }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;