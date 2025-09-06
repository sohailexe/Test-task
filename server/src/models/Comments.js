// models/Comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post reference is required'],
    index: true // Add index for faster lookups
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment author is required']
  },
}, {
  timestamps: true,
});

// Post-save middleware to update post's comment count
commentSchema.post('save', async function() {
  // 'this' refers to the comment document that was just saved
  // We use constructor to access the model to prevent circular dependencies
  await this.constructor.updatePostCommentCount(this.post);
});

// Post-remove middleware (for when a comment is deleted)
// Note: This hook works for doc.remove(), but not for Model.deleteMany() etc.
commentSchema.post('remove', async function() {
  await this.constructor.updatePostCommentCount(this.post);
});


// Static method to calculate and update the comment count on a post
commentSchema.statics.updatePostCommentCount = async function(postId) {
  const Post = mongoose.model('Post');
  try {
    const count = await this.countDocuments({ post: postId });
    await Post.findByIdAndUpdate(postId, { commentCount: count });
  } catch (error) {
    console.error(`Error updating comment count for post ${postId}:`, error);
  }
};


export default mongoose.model('Comment', commentSchema);