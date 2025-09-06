// services/commentService.js
import Comment from '../models/Comments.js';
import Post from '../models/Posts.js'; // Needed to verify post existence
import { NotFoundError } from '../utils/errors/errors.js';

export default class CommentService {
  /**
   * Adds a new comment to a specific post.
   * @param {string} postId - The ID of the post to comment on.
   * @param {string} userId - The ID of the user adding the comment.
   * @param {string} content - The text content of the comment.
   * @returns {Promise<Document>} The newly created comment document.
   */
  async addCommentToPost(postId, userId, content) {
    // 1. Verify that the post exists before adding a comment
    const postExists = await Post.findById(postId).lean();
    if (!postExists) {
      throw new NotFoundError('Post not found.');
    }

    // 2. Create the comment
    const comment = await Comment.create({
      content,
      post: postId,
      author: userId,
    });
    
    // The post-save middleware on the Comment model will handle updating the post's commentCount.

    // 3. Populate author information for the response
    return comment.populate('author', 'name avatar');
  }

  /**
   * Retrieves all comments for a specific post with pagination.
   * @param {string} postId - The ID of the post.
   * @param {object} queryParams - Pagination options { page, limit }.
   * @returns {Promise<object>} An object with comments and pagination details.
   */
  async getCommentsForPost(postId, queryParams) {
    const { page = 1, limit = 20 } = queryParams;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: 1 }) // Show oldest comments first
      .skip(skip)
      .limit(parseInt(limit, 10))
      .populate('author', 'name avatar') // Populate author's name and avatar
      .lean();

    const totalComments = await Comment.countDocuments({ post: postId });

    return {
      comments,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalComments / parseInt(limit, 10)),
      totalComments,
    };
  }
}