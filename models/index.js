const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.
// HasOne associations are associations where the foreign key for the one-to-one relation exists on the target model.

User.hasMany(Post, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };