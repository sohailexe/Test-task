// routes/commentRoutes.js
import express from 'express';
import { body } from 'express-validator';
import CommentController from '../controllers/commentController.js';
import CommentService from '../services/commentService.js';
import { authenticate } from '../middlewares/authenticate.js';
import { handleValidationErrors } from '../middlewares/handleValidateErrors.js';

// Using { mergeParams: true } allows us to access :postId from the parent router (postRoutes)
const router = express.Router({ mergeParams: true });

// Initialize service and controller
const commentService = new CommentService();
const commentController = new CommentController(commentService);

/**
 * @route   POST /api/posts/:postId/comments
 * @desc    Add a comment to a post
 * @access  Private
 */
router.post(
  '/',
  authenticate,
  [
    body('content')
      .trim()
      .notEmpty().withMessage('Comment content cannot be empty.')
      .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters.'),
  ],
  handleValidationErrors,
  commentController.addCommentToPost
);

/**
 * @route   GET /api/posts/:postId/comments
 * @desc    Get all comments for a post
 * @access  Public
 */
router.get('/', commentController.getCommentsForPost);

export default router;