const commentService = require('../services/commentService');
const { successResponse, errorResponse } = require('../utils/responseHelper');

class CommentController {
  // Create a new comment
  async createComment(req, res) {
    try {
      const comment = await commentService.createComment(req.body);
      return successResponse(res, comment, 'Comment created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get all comments
  async getAllComments(req, res) {
    try {
      const { page, limit, sortBy, sortOrder } = req.query;
      const options = { page, limit, sortBy, sortOrder };
      
      const result = await commentService.getAllComments({}, options);
      return successResponse(res, result, 'Comments retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get comment by ID
  async getCommentById(req, res) {
    try {
      const { id } = req.params;
      const comment = await commentService.getCommentById(id);
      return successResponse(res, comment, 'Comment retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  // Get comments by post
  async getCommentsByPost(req, res) {
    try {
      const { postId } = req.params;
      const { page, limit, nested } = req.query;
      
      let result;
      if (nested === 'true') {
        // Get comments with nested replies
        const comments = await commentService.getCommentsWithReplies(postId);
        result = { comments };
      } else {
        // Get comments with pagination
        const options = { page, limit };
        result = await commentService.getCommentsByPost(postId, options);
      }
      
      return successResponse(res, result, 'Comments retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get comments by author
  async getCommentsByAuthor(req, res) {
    try {
      const { authorId } = req.params;
      const { page, limit, sortBy, sortOrder } = req.query;
      
      const options = { page, limit, sortBy, sortOrder };
      const result = await commentService.getCommentsByAuthor(authorId, options);
      return successResponse(res, result, 'Comments retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get replies to a comment
  async getReplies(req, res) {
    try {
      const { commentId } = req.params;
      const { page, limit, sortBy, sortOrder } = req.query;
      
      const options = { page, limit, sortBy, sortOrder };
      const result = await commentService.getReplies(commentId, options);
      return successResponse(res, result, 'Replies retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Update comment
  async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { authorId } = req.body; // In real app, get from auth middleware
      
      const comment = await commentService.updateComment(id, req.body, authorId);
      return successResponse(res, comment, 'Comment updated successfully');
    } catch (error) {
      return errorResponse(res, error.message, error.message.includes('Unauthorized') ? 403 : 404);
    }
  }

  // Delete comment
  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const { authorId } = req.body; // In real app, get from auth middleware
      
      const result = await commentService.deleteComment(id, authorId);
      return successResponse(res, result, 'Comment deleted successfully');
    } catch (error) {
      return errorResponse(res, error.message, error.message.includes('Unauthorized') ? 403 : 404);
    }
  }

  // Toggle like on comment
  async toggleLike(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body; // In real app, get from auth middleware
      
      const result = await commentService.toggleLike(id, userId);
      return successResponse(res, result, 'Like toggled successfully');
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  // Get recent comments
  async getRecentComments(req, res) {
    try {
      const { limit = 10 } = req.query;
      const comments = await commentService.getRecentComments(parseInt(limit));
      return successResponse(res, comments, 'Recent comments retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new CommentController();