import Post from "../models/Posts.js";
import User from "../models/User.js";
import { NotFoundError, ValidationError } from "../utils/errors/errors.js";
import mongoose from "mongoose";

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
    const author = await User.findById(userId).select("name").lean();
    if (!author) {
      throw new NotFoundError("Author not found.");
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
   * Retrieves a filtered, searched, and paginated list of posts.
   * @param {object} queryParams - Contains filtering, search, and pagination parameters.
   * @returns {Promise<object>} An object with posts and pagination details.
   */
  async getAllPosts(queryParams) {
    const {
      // Pagination
      page = 1,
      limit = 10,

      // Search
      search = "",

      // Filters
      authorName = "",
      author = "", // Author ID
      minComments = 0,
      maxComments = null,

      // Date filters
      dateFrom = null,
      dateTo = null,

      // Sorting
      sortBy = "createdAt",
      sortOrder = "desc",
    } = queryParams;

    // Validate pagination parameters
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10))); // Max 100 posts per page
    const skip = (pageNum - 1) * limitNum;

    // Build the filter object
    const filter = this._buildFilter({
      search,
      authorName,
      author,
      minComments,
      maxComments,
      dateFrom,
      dateTo,
    });

    // Build sort object
    const sort = this._buildSort(sortBy, sortOrder);

    try {
      // Execute query with aggregation for better performance
      const [posts, totalCount] = await Promise.all([
        this._getPostsWithAggregation(filter, sort, skip, limitNum),
        Post.countDocuments(filter),
      ]);

      return {
        posts,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalCount / limitNum),
          totalPosts: totalCount,
          postsPerPage: limitNum,
          hasNextPage: pageNum < Math.ceil(totalCount / limitNum),
          hasPrevPage: pageNum > 1,
        },
        filters: {
          search,
          authorName,
          author,
          minComments,
          maxComments,
          dateFrom,
          dateTo,
          sortBy,
          sortOrder,
        },
      };
    } catch (error) {
      throw new ValidationError(`Error retrieving posts: ${error.message}`);
    }
  }

  /**
   * Builds the MongoDB filter object based on query parameters.
   * @param {object} params - Filter parameters
   * @returns {object} MongoDB filter object
   * @private
   */
  _buildFilter({
    search,
    authorName,
    author,
    minComments,
    maxComments,
    dateFrom,
    dateTo,
  }) {
    const filter = {};

    // Text search across title and content
    if (search && search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { content: { $regex: search.trim(), $options: "i" } },
        { authorName: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Filter by author name (case-insensitive)
    if (authorName && authorName.trim()) {
      filter.authorName = { $regex: new RegExp(authorName.trim(), "i") };
    }

    // Filter by author ID
    if (author && mongoose.Types.ObjectId.isValid(author)) {
      filter.author = new mongoose.Types.ObjectId(author);
    }

    // Comment count filters
    if (minComments > 0 || maxComments !== null) {
      filter.commentCount = {};

      if (minComments > 0) {
        filter.commentCount.$gte = parseInt(minComments, 10);
      }

      if (maxComments !== null && maxComments >= 0) {
        filter.commentCount.$lte = parseInt(maxComments, 10);
      }
    }

    // Date range filters
    if (dateFrom || dateTo) {
      filter.createdAt = {};

      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        if (!isNaN(fromDate.getTime())) {
          filter.createdAt.$gte = fromDate;
        }
      }

      if (dateTo) {
        const toDate = new Date(dateTo);
        if (!isNaN(toDate.getTime())) {
          // Set to end of day
          toDate.setHours(23, 59, 59, 999);
          filter.createdAt.$lte = toDate;
        }
      }
    }

    return filter;
  }

  /**
   * Builds the sort object for MongoDB queries.
   * @param {string} sortBy - Field to sort by
   * @param {string} sortOrder - Sort order (asc/desc)
   * @returns {object} MongoDB sort object
   * @private
   */
  _buildSort(sortBy, sortOrder) {
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "title",
      "authorName",
      "commentCount",
    ];

    const validSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";
    const validSortOrder = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    return { [validSortBy]: validSortOrder };
  }

  /**
   * Gets posts using aggregation pipeline for better performance.
   * @param {object} filter - MongoDB filter object
   * @param {object} sort - MongoDB sort object
   * @param {number} skip - Number of documents to skip
   * @param {number} limit - Number of documents to return
   * @returns {Promise<Array>} Array of posts
   * @private
   */
  async _getPostsWithAggregation(filter, sort, skip, limit) {
    const pipeline = [
      // Match stage - apply filters
      { $match: filter },

      // Sort stage
      { $sort: sort },

      // Skip stage
      { $skip: skip },

      // Limit stage
      { $limit: limit },

      // Project stage - select only necessary fields
      {
        $project: {
          title: 1,
          content: 1,
          author: 1,
          authorName: 1,
          commentCount: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    return await Post.aggregate(pipeline);
  }

  /**
   * Get post suggestions based on search query (for autocomplete).
   * @param {string} query - Search query
   * @param {number} limit - Maximum number of suggestions
   * @returns {Promise<Array>} Array of post suggestions
   */
  async getPostSuggestions(query, limit = 5) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const suggestions = await Post.find({
      $or: [
        { title: { $regex: query.trim(), $options: "i" } },
        { authorName: { $regex: query.trim(), $options: "i" } },
      ],
    })
      .select("title authorName")
      .limit(limit)
      .lean();

    return suggestions.map((post) => ({
      id: post._id,
      title: post.title,
      authorName: post.authorName,
      type: "post",
    }));
  }

  /**
   * Get unique author names for filter dropdown.
   * @returns {Promise<Array>} Array of unique author names
   */
  async getUniqueAuthors() {
    const authors = await Post.distinct("authorName");
    return authors.sort();
  }

  /**
   * Get post statistics for current filters.
   * @param {object} queryParams - Same parameters as getAllPosts
   * @returns {Promise<object>} Statistics object
   */
  async getPostStatistics(queryParams) {
    const filter = this._buildFilter({
      search: queryParams.search || "",
      authorName: queryParams.authorName || "",
      author: queryParams.author || "",
      minComments: queryParams.minComments || 0,
      maxComments: queryParams.maxComments || null,
      dateFrom: queryParams.dateFrom || null,
      dateTo: queryParams.dateTo || null,
    });

    const stats = await Post.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalPosts: { $sum: 1 },
          totalComments: { $sum: "$commentCount" },
          avgComments: { $avg: "$commentCount" },
          maxComments: { $max: "$commentCount" },
          uniqueAuthors: { $addToSet: "$authorName" },
        },
      },
      {
        $project: {
          _id: 0,
          totalPosts: 1,
          totalComments: 1,
          avgComments: { $round: ["$avgComments", 2] },
          maxComments: 1,
          uniqueAuthorsCount: { $size: "$uniqueAuthors" },
        },
      },
    ]);

    return (
      stats[0] || {
        totalPosts: 0,
        totalComments: 0,
        avgComments: 0,
        maxComments: 0,
        uniqueAuthorsCount: 0,
      }
    );
  }

  // --- Analytics Methods (unchanged) ---

  /**
   * Returns authors ranked by the total number of posts they have created.
   * @returns {Promise<Array>} A sorted array of authors and their post counts.
   */
  async getTopAuthors() {
    const authorStats = await Post.aggregate([
      {
        $group: {
          _id: "$author",
          authorName: { $first: "$authorName" },
          postCount: { $sum: 1 },
        },
      },
      {
        $sort: { postCount: -1 },
      },
      {
        $project: {
          _id: 0,
          authorId: "$_id",
          name: "$authorName",
          postCount: "$postCount",
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
      .sort({ commentCount: -1 })
      .limit(5)
      .select("title authorName commentCount")
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
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          postsCreated: "$count",
        },
      },
    ]);
    return dailyStats;
  }
}
