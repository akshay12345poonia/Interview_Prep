const Post = require('../models/Post');

class PostService {
  // Create a new post
  async createPost(postData) {
    const post = new Post(postData);
    await post.save();
    return await post.populate('author', 'username email avatar');
  }

  // Get all posts with filters and pagination
  async getAllPosts(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search = '',
      status = 'published'
    } = options;

    const query = { ...filters };
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Search in title and content
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const posts = await Post.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email avatar firstName lastName')
      .populate('commentCount');

    const total = await Post.countDocuments(query);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get post by ID
  async getPostById(postId, includeComments = false) {
    const query = Post.findById(postId)
      .populate('author', 'username email avatar firstName lastName bio')
      .populate('commentCount');

    if (includeComments) {
      query.populate({
        path: 'comments',
        populate: { path: 'author', select: 'username email avatar' }
      });
    }

    const post = await query;
    
    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  // Get posts by author
  async getPostsByAuthor(authorId, options = {}) {
    const filters = { author: authorId };
    return await this.getAllPosts(filters, options);
  }

  // Get posts by category
  async getPostsByCategory(category, options = {}) {
    const filters = { category };
    return await this.getAllPosts(filters, options);
  }

  // Get posts by tag
  async getPostsByTag(tag, options = {}) {
    const filters = { tags: tag };
    return await this.getAllPosts(filters, options);
  }

  // Search posts
  async searchPosts(searchTerm, options = {}) {
    options.search = searchTerm;
    return await this.getAllPosts({}, options);
  }

  // Update post
  async updatePost(postId, updateData, authorId) {
    const post = await Post.findById(postId);
    
    if (!post) {
      throw new Error('Post not found');
    }

    // Check if the user is the author
    if (post.author.toString() !== authorId.toString()) {
      throw new Error('Unauthorized to update this post');
    }

    Object.assign(post, updateData);
    await post.save();

    return await post.populate('author', 'username email avatar');
  }

  // Delete post (with cascading deletes)
  async deletePost(postId, authorId) {
    const post = await Post.findById(postId);
    
    if (!post) {
      throw new Error('Post not found');
    }

    // Check if the user is the author
    if (post.author.toString() !== authorId.toString()) {
      throw new Error('Unauthorized to delete this post');
    }

    await post.deleteOne();
    return { message: 'Post and all associated comments deleted successfully' };
  }

  // Increment post views
  async incrementViews(postId) {
    const post = await Post.findById(postId);
    
    if (!post) {
      throw new Error('Post not found');
    }

    return await post.incrementViews();
  }

  // Toggle like on post
  async toggleLike(postId, userId) {
    const post = await Post.findById(postId);
    
    if (!post) {
      throw new Error('Post not found');
    }

    await post.toggleLike(userId);
    return { liked: post.likes.includes(userId), likeCount: post.likes.length };
  }

  // Get trending posts (most views in last 7 days)
  async getTrendingPosts(limit = 10) {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const posts = await Post.find({
      status: 'published',
      publishedAt: { $gte: sevenDaysAgo }
    })
      .sort({ views: -1, likes: -1 })
      .limit(limit)
      .populate('author', 'username email avatar')
      .populate('commentCount');

    return posts;
  }

  // Get popular posts (most likes)
  async getPopularPosts(limit = 10) {
    const posts = await Post.aggregate([
      { $match: { status: 'published' } },
      { $addFields: { likeCount: { $size: '$likes' } } },
      { $sort: { likeCount: -1, views: -1 } },
      { $limit: limit }
    ]);

    return await Post.populate(posts, { 
      path: 'author', 
      select: 'username email avatar' 
    });
  }

  // Get recent posts
  async getRecentPosts(limit = 10) {
    return await Post.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .populate('author', 'username email avatar')
      .populate('commentCount');
  }
}

module.exports = new PostService();