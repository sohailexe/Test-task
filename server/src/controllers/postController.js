// controllers/postController.js
import { asyncHandler } from '../middlewares/errorHandler.js';
import { ResponseHandler } from '../utils/ResponseHandler.js';

export default class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  createPost = asyncHandler(async (req, res) => {
    const post = await this.postService.createPost(req.body, req.user.userId);
    ResponseHandler.success(res, post, "Post created successfully", 201);
  });

  /**
   * Get all posts with advanced filtering, search, and pagination
   * Query parameters:
   * - page: Page number (default: 1)
   * - limit: Posts per page (default: 10, max: 100)
   * - search: Search in title, content, and author name
   * - authorName: Filter by author name (partial match)
   * - author: Filter by author ID
   * - minComments: Minimum comment count
   * - maxComments: Maximum comment count
   * - dateFrom: Start date filter (YYYY-MM-DD)
   * - dateTo: End date filter (YYYY-MM-DD)
   * - sortBy: Sort field (createdAt, updatedAt, title, authorName, commentCount)
   * - sortOrder: Sort order (asc, desc)
   */
  getAllPosts = asyncHandler(async (req, res) => {
    const result = await this.postService.getAllPosts(req.query);

    ResponseHandler.success(
      res,
      {
        posts: result.posts,
        pagination: result.pagination,
        filters: result.filters,
      },
      "Posts retrieved successfully"
    );
  });

  /**
   * Get post suggestions for autocomplete functionality
   * Query parameters:
   * - q: Search query (minimum 2 characters)
   * - limit: Maximum suggestions (default: 5)
   */
  getPostSuggestions = asyncHandler(async (req, res) => {
    const { q: query, limit = 5 } = req.query;

    if (!query || query.trim().length < 2) {
      return ResponseHandler.success(
        res,
        [],
        "Query too short for suggestions"
      );
    }

    const suggestions = await this.postService.getPostSuggestions(
      query,
      parseInt(limit)
    );
    ResponseHandler.success(
      res,
      suggestions,
      "Suggestions retrieved successfully"
    );
  });

  /**
   * Get unique author names for filter dropdowns
   */
  getUniqueAuthors = asyncHandler(async (req, res) => {
    const authors = await this.postService.getUniqueAuthors();
    ResponseHandler.success(res, authors, "Authors retrieved successfully");
  });

  /**
   * Get statistics for current filter set
   * Uses same query parameters as getAllPosts
   */
  getPostStatistics = asyncHandler(async (req, res) => {
    const stats = await this.postService.getPostStatistics(req.query);
    ResponseHandler.success(res, stats, "Statistics retrieved successfully");
  });

  // --- Analytics Controllers (unchanged) ---

  getTopAuthors = asyncHandler(async (req, res) => {
    const stats = await this.postService.getTopAuthors();
    ResponseHandler.success(res, stats, "Top authors retrieved successfully");
  });

  getTopCommentedPosts = asyncHandler(async (req, res) => {
    const posts = await this.postService.getTopCommentedPosts();
    ResponseHandler.success(res, posts, "Top 5 commented posts retrieved");
  });

  getPostStatsLast7Days = asyncHandler(async (req, res) => {
    const stats = await this.postService.getPostStatsLast7Days();
    ResponseHandler.success(
      res,
      stats,
      "Daily post stats for last 7 days retrieved"
    );
  });
}