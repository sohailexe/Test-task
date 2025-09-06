// models/Post.js
import mongoose from 'mongoose';

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
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  // Denormalized author name for faster list queries
  authorName: {
    type: String,
    required: true
  },
  // Denormalized count for efficient sorting and querying
  commentCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property for comments (if you need to populate them later)
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

// Indexes for performance optimization
postSchema.index({ createdAt: -1 }); // For sorting recent posts
postSchema.index({ author: 1 }); // For finding posts by a specific author
postSchema.index({ commentCount: -1 }); // Crucial for "most commented" analytics
postSchema.index({ authorName: 'text', title: 'text' }); // For search functionality

export default mongoose.model('Post', postSchema);