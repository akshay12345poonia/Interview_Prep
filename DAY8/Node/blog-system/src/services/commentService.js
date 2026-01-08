const Comment = require('../models/Comment');

class CommentService {
  // Create a new comment
  async createComment(commentData) {
    const comment = new Comment(commentData);
    await comment.save();
    return await comment.populate([
      { path: 'author', select: 'username email avatar' },
      { path: 'post', select: 'title' }
    ]);
  }

  // Get all comments with filters and pagination
  async getAllComments(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options;

    const query = { ...filters };
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const comments = await Comment.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email avatar')
      .populate('post', 'title')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'username email avatar' }
      });

    const total = await Comment.countDocuments(query);

    return {
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get comment by ID
  async getCommentById(commentId) {
    const comment = await Comment.findById(commentId)
      .populate('author', 'username email avatar')
      .populate('post', 'title')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'username email avatar' }
      });

    if (!comment) {
      throw new Error('Comment not found');
    }

    return comment;
  }

  // Get comments by post
  async getCommentsByPost(postId, options = {}) {
    const filters = { post: postId, parentComment: null };
    return await this.getAllComments(filters, options);
  }

  // Get comments with replies (nested structure)
  async getCommentsWithReplies(postId) {
    return await Comment.getCommentsWithReplies(postId);
  }

  // Get comments by author
  async getCommentsByAuthor(authorId, options = {}) {
    const filters = { author: authorId };
    return await this.getAllComments(filters, options);
  }

  // Get replies to a comment
  async getReplies(commentId, options = {}) {
    const filters = { parentComment: commentId };
    return await this.getAllComments(filters, options);
  }

  // Update comment
  async updateComment(commentId, updateData, authorId) {
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      throw new Error('Comment not found');
    }

    // Check if the user is the author
    if (comment.author.toString() !== authorId.toString()) {
      throw new Error('Unauthorized to update this comment');
    }

    // Only allow updating content
    if (updateData.content) {
      comment.content = updateData.content;
    }

    await comment.save();

    return await comment.populate([
      { path: 'author', select: 'username email avatar' },
      { path: 'post', select: 'title' }
    ]);
  }

  // Delete comment (with cascading deletes for replies)
  async deleteComment(commentId, authorId) {
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      throw new Error('Comment not found');
    }

    // Check if the user is the author
    if (comment.author.toString() !== authorId.toString()) {
      throw new Error('Unauthorized to delete this comment');
    }

    await comment.deleteOne();
    return { message: 'Comment and all replies deleted successfully' };
  }

  // Toggle like on comment
  async toggleLike(commentId, userId) {
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      throw new Error('Comment not found');
    }

    await comment.toggleLike(userId);
    return { liked: comment.likes.includes(userId), likeCount: comment.likes.length };
  }

  // Get comment count for a post
  async getCommentCountByPost(postId) {
    return await Comment.countDocuments({ post: postId });
  }

  // Get recent comments
  async getRecentComments(limit = 10) {
    return await Comment.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('author', 'username email avatar')
      .populate('post', 'title');
  }
}

module.exports = new CommentService();