// routes/postRoutes.js
import express from 'express';
import { body } from 'express-validator';
import PostController from '../controllers/postController.js';
import PostService from '../services/postService.js';
import { authenticate } from '../middlewares/authenticate.js';
import { handleValidationErrors } from '../middlewares/handleValidateErrors.js';

const router = express.Router();

// Initialize service and controller
const postService = new PostService();
const postController = new PostController(postService);

// --- Core CRUD Routes ---

/**
 * @route   POST api/posts
 * @desc    Create a new blog post
 * @access  Private (requires authentication)
 */
router.post(
  '/',
  authenticate, // Secure this route
  [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('content').trim().notEmpty().withMessage('Content is required.'),
  ],
  handleValidationErrors,
  postController.createPost
);

/**
 * @route   GET api/posts
 * @desc    Get all posts with comment count (with pagination and filtering)
 * @access  Public
 * @query   page, limit, authorName
 */
router.get('/', postController.getAllPosts);


// --- Analytics Routes ---

const analyticsRouter = express.Router();

/**
 * @route   GET api/posts/analytics/top-authors
 * @desc    Get authors ranked by number of posts
 * @access  Public
 */
analyticsRouter.get('/top-authors', postController.getTopAuthors);

/**
 * @route   GET api/posts/analytics/top-commented
 * @desc    Get the top 5 most commented posts
 * @access  Public
 */
analyticsRouter.get('/top-commented', postController.getTopCommentedPosts);

/**
 * @route   GET api/posts/analytics/daily-stats
 * @desc    Get number of posts created per day for the last 7 days
 * @access  Public
 */
analyticsRouter.get('/daily-stats', postController.getPostStatsLast7Days);

// Mount the analytics router under the /analytics path
router.use('/analytics', analyticsRouter);

export default router;