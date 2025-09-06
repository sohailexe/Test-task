// // hooks/usePosts.js
// import { useEffect, useCallback, useMemo } from 'react';
// import { usePostsStore, usePostsData, useFilters, useSearch } from "@/store/postStore";

// /**
//  * Main hook for posts functionality
//  * @param {object} options - Configuration options
//  */
// export const usePosts = (options = {}) => {
//   const {
//     autoFetch = true,
//     initialFilters = {},
//     fetchAnalytics = false
//   } = options;

//   const {
//     posts,
//     pagination,
//     loading,
//     creating,
//     error,
//     statistics,
//     loadingStatistics,
//     uniqueAuthors,
//     loadingAuthors,
//     fetchPosts,
//     createPost,
//     refreshPosts,
//     fetchStatistics,
//     fetchUniqueAuthors,
//     clearError,
//     nextPage,
//     prevPage,
//     goToPage
//   } = usePostsStore();

//   const { filters, setFilter, setFilters, resetFilters } = useFilters();

//   // Initialize filters and fetch data on mount
//   useEffect(() => {
//     if (Object.keys(initialFilters).length > 0) {
//       setFilters(initialFilters);
//     }
    
//     if (autoFetch) {
//       fetchPosts(initialFilters);
//       fetchUniqueAuthors();
      
//       if (fetchAnalytics) {
//         usePostsStore.getState().fetchAnalytics();
//       }
//     }
//   }, []); // Only run on mount

//   // Memoized handlers
//   const handleCreatePost = useCallback(async (postData) => {
//     try {
//       const result = await createPost(postData);
//       return result;
//     } catch (error) {
//       console.error('Failed to create post:', error);
//       throw error;
//     }
//   }, [createPost]);

//   const handleFilterChange = useCallback((key, value) => {
//     setFilter(key, value);
//   }, [setFilter]);

//   const handleApplyFilters = useCallback(async () => {
//     await fetchPosts();
//     await fetchStatistics();
//   }, [fetchPosts, fetchStatistics]);

//   const handleResetFilters = useCallback(() => {
//     resetFilters();
//     fetchPosts();
//   }, [resetFilters, fetchPosts]);

//   // Memoized computed values
//   const hasResults = useMemo(() => posts.length > 0, [posts.length]);
//   const hasMorePages = useMemo(() => pagination.hasNextPage, [pagination.hasNextPage]);
//   const hasPrevPages = useMemo(() => pagination.hasPrevPage, [pagination.hasPrevPage]);
//   const totalPages = useMemo(() => pagination.totalPages, [pagination.totalPages]);
//   const currentPage = useMemo(() => pagination.currentPage, [pagination.currentPage]);

//   return {
//     // Data
//     posts,
//     pagination,
//     statistics,
//     uniqueAuthors,
//     filters,
    
//     // Loading states
//     loading,
//     creating,
//     loadingStatistics,
//     loadingAuthors,
    
//     // Error state
//     error,
//     clearError,
    
//     // Actions
//     createPost: handleCreatePost,
//     refreshPosts,
//     setFilter: handleFilterChange,
//     setFilters,
//     applyFilters: handleApplyFilters,
//     resetFilters: handleResetFilters,
    
//     // Pagination
//     nextPage,
//     prevPage,
//     goToPage,
    
//     // Computed values
//     hasResults,
//     hasMorePages,
//     hasPrevPages,
//     totalPages,
//     currentPage
//   };
// };

// /**
//  * Hook for search functionality with debouncing
//  * @param {object} options - Configuration options
//  */
// export const usePostsSearch = (options = {}) => {
//   const { debounceMs = 300, minQueryLength = 2 } = options;
  
//   const {
//     suggestions,
//     loadingSuggestions,
//     getSuggestions,
//     clearSuggestions
//   } = useSearch();

//   const { filters, setFilter } = useFilters();
//   const { fetchPosts } = usePostsStore();

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce(async (query) => {
//       if (query.length >= minQueryLength) {
//         await getSuggestions(query);
//       } else {
//         clearSuggestions();
//       }
//     }, debounceMs),
//     [getSuggestions, clearSuggestions, minQueryLength, debounceMs]
//   );

//   const handleSearchChange = useCallback((query) => {
//     setFilter('search', query);
//     debouncedSearch(query);
//   }, [setFilter, debouncedSearch]);

//   const handleSearchSubmit = useCallback(async () => {
//     clearSuggestions();
//     await fetchPosts();
//   }, [clearSuggestions, fetchPosts]);

//   const handleSuggestionSelect = useCallback((suggestion) => {
//     setFilter('search', suggestion.title);
//     clearSuggestions();
//     fetchPosts();
//   }, [setFilter, clearSuggestions, fetchPosts]);

//   return {
//     searchQuery: filters.search,
//     suggestions,
//     loadingSuggestions,
//     handleSearchChange,
//     handleSearchSubmit,
//     handleSuggestionSelect,
//     clearSuggestions
//   };
// };

// /**
//  * Hook for pagination functionality
//  */
// export const usePostsPagination = () => {
//   const {
//     pagination,
//     loading,
//     nextPage,
//     prevPage,
//     goToPage
//   } = usePostsStore();

//   const { setFilter } = useFilters();

//   const handlePageSizeChange = useCallback((newPageSize) => {
//     setFilter('limit', newPageSize);
//     setFilter('page', 1); // Reset to first page
//   }, [setFilter]);

//   const paginationInfo = useMemo(() => ({
//     currentPage: pagination.currentPage,
//     totalPages: pagination.totalPages,
//     totalPosts: pagination.totalPosts,
//     postsPerPage: pagination.postsPerPage,
//     hasNextPage: pagination.hasNextPage,
//     hasPrevPage: pagination.hasPrevPage,
//     startItem: (pagination.currentPage - 1) * pagination.postsPerPage + 1,
//     endItem: Math.min(
//       pagination.currentPage * pagination.postsPerPage,
//       pagination.totalPosts
//     )
//   }), [pagination]);

//   return {
//     ...paginationInfo,
//     loading,
//     nextPage,
//     prevPage,
//     goToPage,
//     handlePageSizeChange
//   };
// };

// /**
//  * Hook for sorting functionality
//  */
// export const usePostsSorting = () => {
//   const { filters } = useFilters();
//   const { sortBy, toggleSortOrder } = usePostsStore();

//   const handleSortChange = useCallback((field) => {
//     // If clicking the same field, toggle order; otherwise, default to desc
//     if