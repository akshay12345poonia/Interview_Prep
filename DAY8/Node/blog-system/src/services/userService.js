const User = require('../models/User');

class UserService {
  // Create a new user
  async createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user.getSafeUser();
  }

  // Get all users with optional filters
  async getAllUsers(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search = ''
    } = options;

    const query = { ...filters };
    
    // Search by username or email
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const users = await User.find(query)
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('posts')
      .populate('comments');

    const total = await User.countDocuments(query);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get user by ID
  async getUserById(userId, includeRelations = false) {
    const query = User.findById(userId).select('-password');
    
    if (includeRelations) {
      query.populate('posts').populate('comments');
    }
    
    const user = await query;
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }

  // Get user by email
  async getUserByEmail(email) {
    return await User.findOne({ email }).select('-password');
  }

  // Get user by username
  async getUserByUsername(username) {
    return await User.findOne({ username }).select('-password');
  }

  // Update user
  async updateUser(userId, updateData) {
    // Don't allow direct password updates through this method
    delete updateData.password;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Delete user (with cascading deletes)
  async deleteUser(userId) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    await user.deleteOne();
    return { message: 'User and all associated data deleted successfully' };
  }

  // Get user's posts
  async getUserPosts(userId, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const Post = require('../models/Post');
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email avatar');

    const total = await Post.countDocuments({ author: userId });

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

  // Get user's comments
  async getUserComments(userId, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const Comment = require('../models/Comment');
    const comments = await Comment.find({ author: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email avatar')
      .populate('post', 'title');

    const total = await Comment.countDocuments({ author: userId });

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
}

module.exports = new UserService();