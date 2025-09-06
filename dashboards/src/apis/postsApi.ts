// src/apis/postsApi.ts
import apiClient from '../lib/apiClient';
import axios from 'axios';

// --- Type Definitions for API Communication ---

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorName: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PostFilters {
  page?: number;
  limit?: number;
  search?: string;
  authorName?: string;
  author?: string;
  minComments?: number;
  maxComments?: number | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'authorName' | 'commentCount';
  sortOrder?: 'asc' | 'desc';
}

export interface PostSuggestion {
    id: string;
    title: string;
    authorName: string;
}

export interface PostStatistics {
    totalPosts: number;
    totalComments: number;
    avgComments: number;
    maxComments: number;
    uniqueAuthorsCount: number;
}

// Generic response and error types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// --- API Service ---

const handleApiError = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        return {
            message: error.response?.data?.message || 'An unexpected API error occurred',
            status: error.response?.status,
        };
    }
    return { message: 'An unexpected error occurred' };
};

export const PostsAPI = {
  /**
   * Get all posts with filtering, search, and pagination.
   */
  async getAllPosts(params: PostFilters = {}): Promise<ApiResponse<{ posts: Post[]; pagination: PaginationInfo; }>> {
    try {
      const response = await apiClient.get('/api/posts', { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create a new post.
   */
  async createPost(postData: { title: string; content: string }): Promise<ApiResponse<Post>> {
    try {
      const response = await apiClient.post('/api/posts', postData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get post suggestions for autocomplete.
   */
  async getPostSuggestions(query: string, limit = 5): Promise<ApiResponse<PostSuggestion[]>> {
    try {
      const response = await apiClient.get('/api/posts/suggestions', { params: { q: query, limit } });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get unique author names for filter dropdowns.
   */
  async getUniqueAuthors(): Promise<ApiResponse<string[]>> {
    try {
      const response = await apiClient.get('/api/posts/authors');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get statistics for the current filter set.
   */
  async getPostStatistics(params: PostFilters = {}): Promise<ApiResponse<PostStatistics>> {
    try {
        const response = await apiClient.get('/api/posts/statistics', { params });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
  },

  // --- Analytics Methods ---

  async getTopAuthors(): Promise<ApiResponse<any[]>> { // Replace 'any' with a proper type
    try {
      const response = await apiClient.get('/api/posts/analytics/top-authors');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getTopCommentedPosts(): Promise<ApiResponse<Post[]>> {
    try {
      const response = await apiClient.get('/api/posts/analytics/top-commented');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getPostStatsLast7Days(): Promise<ApiResponse<any[]>> { // Replace 'any' with a proper type
    try {
      const response = await apiClient.get('/api/posts/analytics/daily-stats');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};