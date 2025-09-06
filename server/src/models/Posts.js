import mongoose from 'mongoose';


// Blog Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [10000, 'Content cannot exceed 10000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  // Denormalized author name for faster queries
  authorName: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  // Analytics optimization: denormalized comment count
  commentCount: {
    type: Number,
    default: 0
  },
  // Analytics optimization: store creation date separately
  publishedAt: {
    type: Date,
    default: Date.now
  },
  lastCommentAt: {
    type: Date,
    default: null
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance optimization
postSchema.index({ author: 1, createdAt: -1 }); // Author's posts chronologically
postSchema.index({ commentCount: -1 }); // Most commented posts
postSchema.index({ publishedAt: -1 }); // Recent posts
postSchema.index({ status: 1, publishedAt: -1 }); // Published posts by date
postSchema.index({ authorName: 1 }); // Filter by author name
postSchema.index({ tags: 1 }); // Filter by tags
postSchema.index({ 
  publishedAt: -1, 
  commentCount: -1 
}); // Compound index for analytics queries

// Virtual for comments
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});


export default mongoose.model('Post', postSchema);