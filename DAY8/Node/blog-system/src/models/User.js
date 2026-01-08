const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  avatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for posts
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
});

// Virtual populate for comments
userSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'author'
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });

// Cascading delete: Remove all posts and comments when user is deleted
userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  const Post = mongoose.model('Post');
  const Comment = mongoose.model('Comment');
  
  try {
    // Delete all posts by this user (which will trigger post's pre-delete hook)
    const posts = await Post.find({ author: this._id });
    for (const post of posts) {
      await post.deleteOne();
    }
    
    // Delete all comments by this user
    await Comment.deleteMany({ author: this._id });
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method to get user's full name
userSchema.methods.getFullName = function() {
  return `${this.firstName || ''} ${this.lastName || ''}`.trim() || this.username;
};

// Method to get safe user object (without password)
userSchema.methods.getSafeUser = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', userSchema);

module.exports = User;