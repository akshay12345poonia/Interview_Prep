# 📝 Blog System API

A complete RESTful API for a blog system built with Node.js, Express.js, and MongoDB. Features include user management, posts, comments with nested replies, likes, and cascading deletes.

## 🚀 Features

- **User Management**: Create, read, update, delete users
- **Post Management**: CRUD operations with categories, tags, and search
- **Comment System**: Nested comments (replies), likes
- **Relationships**: Users → Posts → Comments
- **Cascading Deletes**: Automatic cleanup of related data
- **Advanced Queries**: Search, filter, pagination, sorting
- **Virtual Populates**: Efficient relationship handling
- **Validation**: Request validation using express-validator
- **Error Handling**: Comprehensive error handling middleware

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone or create the project

```bash
mkdir blog-system
cd blog-system
```

### 2. Install dependencies

```bash
npm install express mongoose dotenv cors helmet morgan express-validator
npm install --save-dev nodemon
```

### 3. Create folder structure

```bash
mkdir -p src/{config,models,controllers,routes,services,middleware,utils}
```

### 4. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blog_system
API_VERSION=v1
```

### 5. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

### 6. Run the application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

---

## 👤 User Endpoints

### Create User
```http
POST /api/v1/users
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Software developer"
}
```

### Get All Users
```http
GET /api/v1/users?page=1&limit=10&search=john&role=user
```

### Get User by ID
```http
GET /api/v1/users/:id?include=relations
```

### Get User by Username
```http
GET /api/v1/users/username/:username
```

### Update User
```http
PUT /api/v1/users/:id
Content-Type: application/json

{
  "firstName": "John Updated",
  "bio": "New bio"
}
```

### Delete User (Cascading)
```http
DELETE /api/v1/users/:id
```

### Get User's Posts
```http
GET /api/v1/users/:id/posts?page=1&limit=10
```

### Get User's Comments
```http
GET /api/v1/users/:id/comments?page=1&limit=10
```

---

## 📰 Post Endpoints

### Create Post
```http
POST /api/v1/posts
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "author": "USER_ID",
  "category": "technology",
  "tags": ["nodejs", "mongodb"],
  "status": "published"
}
```

### Get All Posts
```http
GET /api/v1/posts?page=1&limit=10&status=published&category=technology
```

### Get Post by ID
```http
GET /api/v1/posts/:id?comments=true
```

### Get Trending Posts
```http
GET /api/v1/posts/trending?limit=10
```

### Get Popular Posts
```http
GET /api/v1/posts/popular?limit=10
```

### Get Recent Posts
```http
GET /api/v1/posts/recent?limit=10
```

### Search Posts
```http
GET /api/v1/posts/search?q=nodejs&page=1&limit=10
```

### Get Posts by Author
```http
GET /api/v1/posts/author/:authorId?page=1&limit=10
```

### Get Posts by Category
```http
GET /api/v1/posts/category/technology?page=1&limit=10
```

### Get Posts by Tag
```http
GET /api/v1/posts/tag/nodejs?page=1&limit=10
```

### Update Post
```http
PUT /api/v1/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "authorId": "USER_ID"
}
```

### Delete Post (Cascading)
```http
DELETE /api/v1/posts/:id
Content-Type: application/json

{
  "authorId": "USER_ID"
}
```

### Toggle Like on Post
```http
POST /api/v1/posts/:id/like
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

---

## 💬 Comment Endpoints

### Create Comment
```http
POST /api/v1/comments
Content-Type: application/json

{
  "content": "Great post!",
  "author": "USER_ID",
  "post": "POST_ID",
  "parentComment": "COMMENT_ID"  // Optional, for replies
}
```

### Get All Comments
```http
GET /api/v1/comments?page=1&limit=10
```

### Get Comment by ID
```http
GET /api/v1/comments/:id
```

### Get Comments by Post
```http
GET /api/v1/comments/post/:postId?nested=true&page=1&limit=10
```

### Get Comments by Author
```http
GET /api/v1/comments/author/:authorId?page=1&limit=10
```

### Get Replies to Comment
```http
GET /api/v1/comments/:commentId/replies?page=1&limit=10
```

### Get Recent Comments
```http
GET /api/v1/comments/recent?limit=10
```

### Update Comment
```http
PUT /api/v1/comments/:id
Content-Type: application/json

{
  "content": "Updated comment",
  "authorId": "USER_ID"
}
```

### Delete Comment (Cascading)
```http
DELETE /api/v1/comments/:id
Content-Type: application/json

{
  "authorId": "USER_ID"
}
```

### Toggle Like on Comment
```http
POST /api/v1/comments/:id/like
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

---

## 🔄 Cascading Deletes

The system implements cascading deletes to maintain data integrity:

1. **Delete User** → Deletes all user's posts and comments
2. **Delete Post** → Deletes all comments on that post
3. **Delete Comment** → Deletes all replies to that comment

---

## 📊 Data Models

### User Schema
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (required),
  firstName: String,
  lastName: String,
  bio: String,
  avatar: String,
  isActive: Boolean,
  role: Enum ['user', 'admin', 'moderator'],
  createdAt: Date,
  updatedAt: Date
}
```

### Post Schema
```javascript
{
  title: String (required),
  content: String (required),
  excerpt: String,
  author: ObjectId → User (required),
  tags: [String],
  category: Enum,
  coverImage: String,
  status: Enum ['draft', 'published', 'archived'],
  views: Number,
  likes: [ObjectId → User],
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Schema
```javascript
{
  content: String (required),
  author: ObjectId → User (required),
  post: ObjectId → Post (required),
  parentComment: ObjectId → Comment,
  likes: [ObjectId → User],
  isEdited: Boolean,
  editedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔍 Query Parameters

### Pagination
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Sorting
- `sortBy`: Field to sort by (default: 'createdAt')
- `sortOrder`: 'asc' or 'desc' (default: 'desc')

### Filtering
- `search`: Search term for users (username/email)
- `status`: Filter posts by status
- `category`: Filter posts by category
- `role`: Filter users by role
- `isActive`: Filter users by active status

### Special
- `include=relations`: Include related data (posts, comments)
- `comments=true`: Include comments in post response
- `nested=true`: Get nested comment structure

---

## 🧪 Testing with cURL

### Create a User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create a Post
```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Post",
    "content": "This is a test post content",
    "author": "USER_ID_HERE",
    "category": "technology"
  }'
```

### Get All Posts
```bash
curl http://localhost:3000/api/v1/posts?page=1&limit=5
```

---

## 🏗️ Project Structure

```
blog-system/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema & methods
│   │   ├── Post.js              # Post schema & methods
│   │   └── Comment.js           # Comment schema & methods
│   ├── controllers/
│   │   ├── userController.js    # User request handlers
│   │   ├── postController.js    # Post request handlers
│   │   └── commentController.js # Comment request handlers
│   ├── services/
│   │   ├── userService.js       # User business logic
│   │   ├── postService.js       # Post business logic
│   │   └── commentService.js    # Comment business logic
│   ├── routes/
│   │   ├── userRoutes.js        # User endpoints
│   │   ├── postRoutes.js        # Post endpoints
│   │   └── commentRoutes.js     # Comment endpoints
│   ├── middleware/
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Request validation
│   ├── utils/
│   │   └── responseHelper.js    # Response formatting
│   └── app.js                   # Express app setup
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies
├── server.js                    # Server entry point
└── README.md                    # Documentation
```

---

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation with express-validator
- MongoDB injection prevention
- Password field excluded from queries

---

## 🚦 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": []  // Optional validation errors
}
```

---

## 📈 Performance Features

- MongoDB indexes on frequently queried fields
- Virtual populates for efficient queries
- Pagination for large datasets
- Text search indexes

---

## 🤝 Contributing

Feel free to contribute to this project by creating pull requests or reporting issues.

---

## 📄 License

ISC

---

## 👨‍💻 Author

Blog System API

---

## 🙏 Acknowledgments

- Express.js
- MongoDB & Mongoose
- Node.js community