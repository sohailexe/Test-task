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
    required: [true, 'Post reference is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment author is required']
  },

  createdDate: {
    type: String, // Store as YYYY-MM-DD for easy grouping
    required: true
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for comments
commentSchema.index({ post: 1, createdAt: -1 }); // Comments for a post
commentSchema.index({ author: 1, createdAt: -1 }); // User's comments
commentSchema.index({ createdAt: -1 }); // Recent comments
commentSchema.index({ createdDate: 1 }); // Daily analytics

// Pre-save middleware to set createdDate
commentSchema.pre('save', function(next) {
  if (this.isNew) {
    this.createdDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  }
  next();
});

// Post-save middleware to update post comment count
commentSchema.post('save', async function(doc) {
  try {
    // Update post comment count
    await mongoose.model('Post').findByIdAndUpdate(
      doc.post,
      { 
        $inc: { commentCount: 1 },
        lastCommentAt: new Date()
      }
    );
    
    // Update user comment count
    await mongoose.model('User').findByIdAndUpdate(
      doc.author,
      { $inc: { commentCount: 1 } }
    );
  } catch (error) {
    console.error('Error updating comment counts:', error);
  }
});

// Post-remove middleware to update post comment count
commentSchema.post('remove', async function(doc) {
  try {
    // Update post comment count
    await mongoose.model('Post').findByIdAndUpdate(
      doc.post,
      { $inc: { commentCount: -1 } }
    );
    
    // Update user comment count
    await mongoose.model('User').findByIdAndUpdate(
      doc.author,
      { $inc: { commentCount: -1 } }
    );
  } catch (error) {
    console.error('Error updating comment counts:', error);
  }
});

export default mongoose.model('Comment', commentSchema);