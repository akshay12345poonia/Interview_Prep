const postService = require('../services/postService');
const { successResponse, errorResponse } = require('../utils/responseHelper');

class PostController {
  // Create a new post
  async createPost(req, res) {
    try {
      const post = await postService.createPost(req.body);
      return successResponse(res, post, 'Post created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get all posts
  async getAllPosts(req, res) {
    try {
      const { page, limit, sortBy, sortOrder, search, status, category, author } = req.query;
      
      const filters = {};
      if (category) filters.category = category;
      if (author) filters.author = author;

      const options = { page, limit, sortBy, sortOrder, search, status };
      
      const result = await postService.getAllPosts(filters, options);
      return successResponse(res, result, 'Posts retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get post by ID
  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const includeComments = req.query.comments === 'true';
      
      const post = await postService.getPostById(id, includeComments);
      
      // Increment views
      await postService.incrementViews(id);
      
      return successResponse(res, post, 'Post retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  // Get posts by author
  async getPostsByAuthor(req, res) {
    try {
      const { authorId } = req.params;
      const { page, limit, sortBy, sortOrder } = req.query;
      
      const result = await postService.getPostsByAuthor(authorId, { 
        page, limit, sortBy, sortOrder 
      });
      return successResponse(res, result, 'Posts retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get posts by category
  async getPostsByCategory(req, res) {
    try {
      const { category } = req.params;
      const { page, limit, sortBy, sortOrder } = req.query;
      
      const result = await postService.getPostsByCategory(category, { 
        page, limit, sortBy, sortOrder 
      });
      return successResponse(res, result, 'Posts retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get posts by tag
  async getPostsByTag(req, res) {
    try {
      const { tag } = req.params;
      const { page, limit, sortBy, sortOrder } = req.query;
      
      const result = await postService.getPostsByTag(tag, { 
        page, limit, sortBy, sortOrder 
      });
      return successResponse(res, result, 'Posts retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Search posts
  async searchPosts(req, res) {
    try {
      const { q: searchTerm } = req.query;
      const { page, limit, sortBy, sortOrder } = req.query;
      
      if (!searchTerm) {
        return errorResponse(res, 'Search term is required', 400);
      }
      
      const result = await postService.searchPosts(searchTerm, { 
        page, limit, sortBy, sortOrder 
      });
      return successResponse(res, result, 'Search results retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Update post
  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { authorId } = req.body; // In real app, get from auth middleware
      
      const post = await postService.updatePost(id, req.body, authorId);
      return successResponse(res, post, 'Post updated successfully');
    } catch (error) {
      return errorResponse(res, error.message, error.message.includes('Unauthorized') ? 403 : 404);
    }
  }

  // Delete post
  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const { authorId } = req.body; // In real app, get from auth middleware
      
      const result = await postService.deletePost(id, authorId);
      return successResponse(res, result, 'Post deleted successfully');
    } catch (error) {
      return errorResponse(res, error.message, error.message.includes('Unauthorized') ? 403 : 404);
    }
  }

  // Toggle like on post
  async toggleLike(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body; // In real app, get from auth middleware
      
      const result = await postService.toggleLike(id, userId);
      return successResponse(res, result, 'Like toggled successfully');
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  // Get trending posts
  async getTrendingPosts(req, res) {
    try {
      const { limit = 10 } = req.query;
      const posts = await postService.getTrendingPosts(parseInt(limit));
      return successResponse(res, posts, 'Trending posts retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get popular posts
  async getPopularPosts(req, res) {
    try {
      const { limit = 10 } = req.query;
      const posts = await postService.getPopularPosts(parseInt(limit));
      return successResponse(res, posts, 'Popular posts retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get recent posts
  async getRecentPosts(req, res) {
    try {
      const { limit = 10 } = req.query;
      const posts = await postService.getRecentPosts(parseInt(limit));
      return successResponse(res, posts, 'Recent posts retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new PostController();