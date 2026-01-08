const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseHelper');

class UserController {
  // Create a new user
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return successResponse(res, user, 'User created successfully', 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get all users
  async getAllUsers(req, res) {
    try {
      const { page, limit, sortBy, sortOrder, search, role, isActive } = req.query;
      
      const filters = {};
      if (role) filters.role = role;
      if (isActive !== undefined) filters.isActive = isActive === 'true';

      const options = { page, limit, sortBy, sortOrder, search };
      
      const result = await userService.getAllUsers(filters, options);
      return successResponse(res, result, 'Users retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const includeRelations = req.query.include === 'relations';
      
      const user = await userService.getUserById(id, includeRelations);
      return successResponse(res, user, 'User retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  // Get user by username
  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await userService.getUserByUsername(username);
      
      if (!user) {
        return errorResponse(res, 'User not found', 404);
      }
      
      return successResponse(res, user, 'User retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Update user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.updateUser(id, req.body);
      return successResponse(res, user, 'User updated successfully');
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.deleteUser(id);
      return successResponse(res, result, 'User deleted successfully');
    } catch (error) {
      return errorResponse(res, error.message, 404);
    }
  }

  // Get user's posts
  async getUserPosts(req, res) {
    try {
      const { id } = req.params;
      const { page, limit } = req.query;
      
      const result = await userService.getUserPosts(id, { page, limit });
      return successResponse(res, result, 'User posts retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  // Get user's comments
  async getUserComments(req, res) {
    try {
      const { id } = req.params;
      const { page, limit } = req.query;
      
      const result = await userService.getUserComments(id, { page, limit });
      return successResponse(res, result, 'User comments retrieved successfully');
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = new UserController();