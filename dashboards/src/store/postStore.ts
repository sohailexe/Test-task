// src/stores/postsStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PostsAPI, Post, PaginationInfo, PostFilters, ApiError, PostSuggestion, PostStatistics } from '../apis/postsApi';

// --- State and Action Types ---

interface PostsState {
  // Data
  posts: Post[];
  pagination: PaginationInfo;
  uniqueAuthors: string[];
  suggestions: PostSuggestion[];
  statistics: PostStatistics;

  // Filters
  filters: PostFilters;

  // UI State
  loading: {
    posts: boolean;
    create: boolean;
    suggestions: boolean;
    authors: boolean;
    statistics: boolean;
  };
  error: {
    posts: ApiError | null;
    create: ApiError | null;
  };

  // Actions
  setFilter: (key: keyof PostFilters, value: any) => void;
  applyFilters: () => Promise<void>;
  resetFilters: () => void;
  fetchPosts: (params?: PostFilters) => Promise<void>;
  createPost: (postData: { title: string; content: string }) => Promise<void>;
  refreshPosts: () => Promise<void>;
  getSuggestions: (query: string) => Promise<void>;
  clearSuggestions: () => void;
  fetchUniqueAuthors: () => Promise<void>;
  fetchStatistics: () => Promise<void>;
  goToPage: (page: number) => void;
  sortBy: (field: PostFilters['sortBy']) => void;
}

// --- Initial State Definition ---

const initialFilters: PostFilters = {
  page: 1,
  limit: 6,
  search: '',
  authorName: '',
  minComments: 0,
  maxComments: null,
  dateFrom: null,
  dateTo: null,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const initialPagination: PaginationInfo = {
  currentPage: 1, totalPages: 1, totalPosts: 0, postsPerPage: 6, hasNextPage: false, hasPrevPage: false
};

const initialStatistics: PostStatistics = {
  totalPosts: 0, totalComments: 0, avgComments: 0, maxComments: 0, uniqueAuthorsCount: 0
};

// --- Store Implementation ---

export const usePostsStore = create<PostsState>()(
  devtools(
    (set, get) => ({
      // Initial State
      posts: [],
      pagination: initialPagination,
      uniqueAuthors: [],
      suggestions: [],
      statistics: initialStatistics,
      filters: initialFilters,
      loading: { posts: false, create: false, suggestions: false, authors: false, statistics: false },
      error: { posts: null, create: null },

      // --- Actions ---

      setFilter: (key, value) => {
        set(state => ({
          filters: {
            ...state.filters,
            [key]: value,
            // Reset to page 1 when any filter other than 'page' itself is changed
            ...(key !== 'page' && { page: 1 }),
          }
        }));
      },
      
      applyFilters: async () => {
        await get().fetchPosts(get().filters);
        // Optionally fetch stats whenever filters are applied
        await get().fetchStatistics();
      },

      resetFilters: () => {
        set({ filters: initialFilters });
        get().applyFilters(); // Fetch with default filters after resetting
      },

      fetchPosts: async (params) => {
        set(state => ({ loading: { ...state.loading, posts: true }, error: { ...state.error, posts: null } }));
        try {
          const response = await PostsAPI.getAllPosts(params);
          set({
            posts: response.data.posts,
            pagination: response.data.pagination,
          });
        } catch (error) {
          set(state => ({ error: { ...state.error, posts: error as ApiError } }));
        } finally {
          set(state => ({ loading: { ...state.loading, posts: false } }));
        }
      },
      
      createPost: async (postData) => {
        set(state => ({ loading: { ...state.loading, create: true }, error: { ...state.error, create: null } }));
        try {
            await PostsAPI.createPost(postData);
            // On success, refresh the current view to show the new post
            await get().refreshPosts();
        } catch (error) {
            set(state => ({ error: { ...state.error, create: error as ApiError } }));
            throw error; // Re-throw to be caught in the component for UI feedback (e.g., toast)
        } finally {
            set(state => ({ loading: { ...state.loading, create: false } }));
        }
      },

      refreshPosts: async () => {
        await get().fetchPosts(get().filters);
      },

      getSuggestions: async (query) => {
        if (query.length < 2) return;
        set(state => ({ loading: { ...state.loading, suggestions: true } }));
        try {
            const response = await PostsAPI.getPostSuggestions(query);
            set({ suggestions: response.data });
        } catch (error) {
            console.error("Failed to fetch suggestions:", error);
        } finally {
            set(state => ({ loading: { ...state.loading, suggestions: false } }));
        }
      },

      clearSuggestions: () => set({ suggestions: [] }),

      fetchUniqueAuthors: async () => {
        set(state => ({ loading: { ...state.loading, authors: true } }));
        try {
            const response = await PostsAPI.getUniqueAuthors();
            set({ uniqueAuthors: response.data });
        } catch (error) {
            console.error("Failed to fetch authors:", error);
        } finally {
            set(state => ({ loading: { ...state.loading, authors: false } }));
        }
      },

      fetchStatistics: async () => {
        set(state => ({ loading: { ...state.loading, statistics: true } }));
        try {
            const response = await PostsAPI.getPostStatistics(get().filters);
            set({ statistics: response.data });
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        } finally {
            set(state => ({ loading: { ...state.loading, statistics: false } }));
        }
      },
      
      goToPage: (page) => {
          const { pagination } = get();
          if (page >= 1 && page <= pagination.totalPages) {
              get().setFilter('page', page);
              get().applyFilters();
          }
      },
      
      sortBy: (field) => {
        const { filters } = get();
        const sortOrder = filters.sortBy === field && filters.sortOrder === 'desc' ? 'asc' : 'desc';
        set(state => ({
            filters: {
                ...state.filters,
                sortBy: field,
                sortOrder: sortOrder,
                page: 1, // Reset to first page when sorting
            }
        }));
        get().applyFilters();
      }
    }),
    { name: 'posts-store' }
  )
);