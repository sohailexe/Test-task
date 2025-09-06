// services/postService.js
import Post from '../models/Posts.js';
import User from '../models/User.js';
import { NotFoundError } from '../utils/errors/errors.js';
import mongoose from 'mongoose';

export default class PostService {
  /**
   * Creates a new blog post.
   * @param {object} postData - Contains title and content.
   * @param {string} userId - The ID of the authenticated user (author).
   * @returns {Promise<Document>} The newly created post document.
   */
  async createPost(postData, userId) {
    const { title, content } = postData;

    // Fetch the author's name to denormalize it
    const author = await User.findById(userId).select('name').lean();
    if (!author) {
      throw new NotFoundError('Author not found.');
    }

    const post = await Post.create({
      title,
      content,
      author: userId,
      authorName: author.name,
    });

    return post;
  }

  /**
   * Retrieves a paginated list of all posts with their comment counts.
   * Also supports filtering by author name.
   * @param {object} queryParams - Contains page, limit, authorName.
   * @returns {Promise<object>} An object with posts and pagination details.
   */
  async getAllPosts(queryParams) {
    const { page = 1, limit = 10, authorName } = queryParams;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const filter = {};
    if (authorName) {
      // Case-insensitive regex search for author name
      filter.authorName = { $regex: new RegExp(authorName, 'i') };
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 }) // Show newest posts first
      .skip(skip)
      .limit(parseInt(limit, 10))
      .select('title authorName createdAt commentCount') // Select only necessary fields
      .lean();

    const totalPosts = await Post.countDocuments(filter);

    return {
      posts,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalPosts / parseInt(limit, 10)),
      totalPosts,
    };
  }

  // --- Analytics Methods ---

  /**
   * Returns authors ranked by the total number of posts they have created.
   * @returns {Promise<Array>} A sorted array of authors and their post counts.
   */
  async getTopAuthors() {
    const authorStats = await Post.aggregate([
      // Stage 1: Group posts by author and count them
      {
        $group: {
          _id: '$author', // Group by the author's ObjectId
          authorName: { $first: '$authorName' }, // Keep the author's name
          postCount: { $sum: 1 }, // Count the number of posts for each author
        },
      },
      // Stage 2: Sort by the post count in descending order
      {
        $sort: { postCount: -1 },
      },
      // Stage 3: Project to reshape the output documents
      {
        $project: {
          _id: 0, // Exclude the default _id field
          authorId: '$_id',
          name: '$authorName',
          postCount: '$postCount',
        },
      },
    ]);
    return authorStats;
  }

  /**
   * Returns the top 5 most commented posts.
   * @returns {Promise<Array>} An array of the top 5 posts.
   */
  async getTopCommentedPosts() {
    return await Post.find()
      .sort({ commentCount: -1 }) // Sort by the denormalized commentCount
      .limit(5)
      .select('title authorName commentCount')
      .lean();
  }

  /**
   * Returns the number of posts created per day for the last 7 days.
   * @returns {Promise<Array>} An array of objects with date and post count.
   */
  async getPostStatsLast7Days() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyStats = await Post.aggregate([
      // Stage 1: Filter documents to include only the last 7 days
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      // Stage 2: Group documents by the creation date and count them
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      // Stage 3: Sort the results by date in ascending order
      {
        $sort: { _id: 1 },
      },
      // Stage 4: Project to reshape the output
      {
        $project: {
          _id: 0,
          date: '$_id',
          postsCreated: '$count',
        },
      },
    ]);
    return dailyStats;
  }
}