// controllers/postController.js
import { asyncHandler } from '../middlewares/errorHandler.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';

export default class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  createPost = asyncHandler(async (req, res) => {
    // req.user is added by the 'authenticate' middleware
    const post = await this.postService.createPost(req.body, req.user.userId);
    ResponseHandler.success(res, post, 'Post created successfully', 201);
  });

  getAllPosts = asyncHandler(async (req, res) => {
    const result = await this.postService.getAllPosts(req.query);
    ResponseHandler.success(res, result, 'Posts retrieved successfully');
  });

  // --- Analytics Controllers ---

  getTopAuthors = asyncHandler(async (req, res) => {
    const stats = await this.postService.getTopAuthors();
    ResponseHandler.success(res, stats, 'Top authors retrieved successfully');
  });

  getTopCommentedPosts = asyncHandler(async (req, res) => {
    const posts = await this.postService.getTopCommentedPosts();
    ResponseHandler.success(res, posts, 'Top 5 commented posts retrieved');
  });

  getPostStatsLast7Days = asyncHandler(async (req, res) => {
    const stats = await this.postService.getPostStatsLast7Days();
    ResponseHandler.success(res, stats, 'Daily post stats for last 7 days retrieved');
  });
}