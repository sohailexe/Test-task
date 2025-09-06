import express from "express";
import { body, query } from "express-validator";
import PostController from "../controllers/postController.js";
import PostService from "../services/postService.js";
import { authenticate } from "../middlewares/authenticate.js";
import { handleValidationErrors } from "../middlewares/handleValidateErrors.js";

const router = express.Router();

const postService = new PostService();
const postController = new PostController(postService);

// --- Core CRUD Routes ---

/**
 * @route   POST api/posts
 * @desc    Create a new blog post
 * @access  Private (requires authentication)
 */
router.post(
  "/",
  authenticate,
  [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ max: 200 })
      .withMessage("Title cannot exceed 200 characters."),
    body("content").trim().notEmpty().withMessage("Content is required."),
  ],
  handleValidationErrors,
  postController.createPost
);

/**
 * @route   GET api/posts
 * @desc    Get all posts with advanced filtering, search, and pagination
 * @access  Public
 * @query   page, limit, search, authorName, author, minComments, maxComments,
 *          dateFrom, dateTo, sortBy, sortOrder
 */
router.get(
  "/",
  [
    // Validation for query parameters
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer."),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100."),
    query("minComments")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Minimum comments must be non-negative."),
    query("maxComments")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Maximum comments must be non-negative."),
    query("dateFrom")
      .optional()
      .isISO8601()
      .withMessage("Date from must be a valid date (YYYY-MM-DD)."),
    query("dateTo")
      .optional()
      .isISO8601()
      .withMessage("Date to must be a valid date (YYYY-MM-DD)."),
    query("sortBy")
      .optional()
      .isIn(["createdAt", "updatedAt", "title", "authorName", "commentCount"])
      .withMessage(
        "Sort by must be one of: createdAt, updatedAt, title, authorName, commentCount."
      ),
    query("sortOrder")
      .optional()
      .isIn(["asc", "desc"])
      .withMessage("Sort order must be asc or desc."),
  ],
  handleValidationErrors,
  postController.getAllPosts
);

/**
 * @route   GET api/posts/suggestions
 * @desc    Get post suggestions for autocomplete
 * @access  Public
 * @query   q (query string), limit
 */
router.get(
  "/suggestions",
  [
    query("q")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Query must be at least 2 characters long."),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage("Limit must be between 1 and 20."),
  ],
  handleValidationErrors,
  postController.getPostSuggestions
);

/**
 * @route   GET api/posts/authors
 * @desc    Get unique author names for filter dropdowns
 * @access  Public
 */
router.get("/authors", postController.getUniqueAuthors);

/**
 * @route   GET api/posts/statistics
 * @desc    Get statistics for current filter set
 * @access  Public
 * @query   Same parameters as GET /posts
 */
router.get(
  "/statistics",
  [
    // Same validations as getAllPosts for consistency
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("minComments").optional().isInt({ min: 0 }),
    query("maxComments").optional().isInt({ min: 0 }),
    query("dateFrom").optional().isISO8601(),
    query("dateTo").optional().isISO8601(),
    query("sortBy")
      .optional()
      .isIn(["createdAt", "updatedAt", "title", "authorName", "commentCount"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
  ],
  handleValidationErrors,
  postController.getPostStatistics
);

// --- Analytics Routes ---

const analyticsRouter = express.Router();

/**
 * @route   GET api/posts/analytics/top-authors
 * @desc    Get authors ranked by number of posts
 * @access  Public
 */
analyticsRouter.get("/top-authors", postController.getTopAuthors);

/**
 * @route   GET api/posts/analytics/top-commented
 * @desc    Get the top 5 most commented posts
 * @access  Public
 */
analyticsRouter.get("/top-commented", postController.getTopCommentedPosts);

/**
 * @route   GET api/posts/analytics/daily-stats
 * @desc    Get number of posts created per day for the last 7 days
 * @access  Public
 */
analyticsRouter.get("/daily-stats", postController.getPostStatsLast7Days);

// Mount the analytics router under the /analytics path
router.use("/analytics", analyticsRouter);

export default router;
