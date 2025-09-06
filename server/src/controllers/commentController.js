// controllers/commentController.js
import { asyncHandler } from '../middlewares/errorHandler.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';

export default class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  addCommentToPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.user; // From 'authenticate' middleware
    const { content } = req.body;

    const comment = await this.commentService.addCommentToPost(postId, userId, content);
    ResponseHandler.success(res, comment, 'Comment added successfully', 201);
  });

  getCommentsForPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const result = await this.commentService.getCommentsForPost(postId, req.query);
    ResponseHandler.success(res, result, 'Comments retrieved successfully');
  });
}