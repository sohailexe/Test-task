import React, { useEffect, useState } from "react";
import { usePostsStore } from "@/store/postStore";
import {
  Search,
  Filter,
  Calendar,
  User,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  Plus,
  RefreshCw,
} from "lucide-react";

const PostsPage = () => {
  const {
    posts,
    pagination,
    filters,
    loading,
    error,
    uniqueAuthors,
    statistics,
    setFilter,
    applyFilters,
    resetFilters,
    fetchPosts,
    fetchUniqueAuthors,
    fetchStatistics,
    goToPage,
    sortBy,
  } = usePostsStore();

  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    fetchPosts();
    fetchUniqueAuthors();
    fetchStatistics();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        setFilter("search", searchInput);
        applyFilters();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleFilterChange = (key, value) => {
    setFilter(key, value);
    applyFilters();
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const { currentPage, totalPages } = pagination;

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
    );

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-2 mx-1 text-sm font-medium rounded-md ${
            i === currentPage
              ? "text-white bg-blue-600 border border-blue-600"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 mx-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    );

    return buttons;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  fetchPosts();
                  fetchStatistics();
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading.posts ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Total Posts</p>
              <p className="text-2xl font-bold text-blue-900">
                {statistics.totalPosts}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">
                Total Comments
              </p>
              <p className="text-2xl font-bold text-green-900">
                {statistics.totalComments}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">
                Avg Comments
              </p>
              <p className="text-2xl font-bold text-purple-900">
                {statistics.avgComments?.toFixed(1) || 0}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-600 font-medium">
                Max Comments
              </p>
              <p className="text-2xl font-bold text-orange-900">
                {statistics.maxComments}
              </p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-sm text-pink-600 font-medium">Authors</p>
              <p className="text-2xl font-bold text-pink-900">
                {statistics.uniqueAuthorsCount}
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <select
                    value={filters.authorName}
                    onChange={(e) =>
                      handleFilterChange("authorName", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Authors</option>
                    {uniqueAuthors.map((author) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Comments
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={filters.minComments}
                    onChange={(e) =>
                      handleFilterChange(
                        "minComments",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Comments
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={filters.maxComments || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        "maxComments",
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => sortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="createdAt">Date Created</option>
                    <option value="updatedAt">Date Updated</option>
                    <option value="title">Title</option>
                    <option value="commentCount">Comments</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Reset Filters
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error.posts && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">
              Error loading posts: {error.posts.message}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading.posts ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading posts...</p>
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500 text-lg">No posts found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 truncate">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 ml-2">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.commentCount}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.authorName}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.createdAt)}
                        </div>
                      </div>

                      {post.updatedAt !== post.createdAt && (
                        <div className="mt-2 text-xs text-gray-400">
                          Updated: {formatDate(post.updatedAt)}
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Add Comment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    {(pagination.currentPage - 1) * pagination.postsPerPage + 1}{" "}
                    to{" "}
                    {Math.min(
                      pagination.currentPage * pagination.postsPerPage,
                      pagination.totalPosts
                    )}{" "}
                    of {pagination.totalPosts} posts
                  </div>

                  <div className="flex items-center justify-center">
                    {renderPaginationButtons()}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    Sort:
                    {filters.sortOrder === "desc" ? (
                      <SortDesc className="w-4 h-4" />
                    ) : (
                      <SortAsc className="w-4 h-4" />
                    )}
                    {filters.sortBy}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostsPage;
