# Rate Limiter Middleware API

A robust rate limiting middleware for Express.js applications with in-memory storage and optional MongoDB persistence.

## Features

- ✅ IP-based rate limiting (10 requests per minute default)
- ✅ In-memory storage for fast performance
- ✅ Optional MongoDB integration for analytics
- ✅ Configurable limits and time windows
- ✅ Rate limit headers (X-RateLimit-*)
- ✅ Admin endpoints to manage rate limits
- ✅ Automatic cleanup of expired entries
- ✅ Comprehensive error handling

## Installation

```bash
# Clone the repository
git clone 
cd rate-limiter-api

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start MongoDB (optional)
mongod

# Run the application
npm run dev
```

## Configuration

Edit `.env` file to configure:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rate-limiter
RATE_LIMIT_WINDOW_MS=60000      # 1 minute
RATE_LIMIT_MAX_REQUESTS=10      # 10 requests per window
```

## API Endpoints

### Public Endpoints (Rate Limited)

- `GET /api/test` - Test endpoint
- `POST /api/data` - Post data
- `GET /api/users` - Get users list

### Admin Endpoints (No Rate Limit)

- `GET /admin/rate-limits` - View all rate limits
- `GET /admin/rate-limit/:ip` - View specific IP rate limit
- `DELETE /admin/rate-limit/:ip` - Reset rate limit for specific IP
- `DELETE /admin/rate-limits` - Reset all rate limits

## Testing

Test the rate limiter with curl:

```bash
# Make multiple requests to hit the rate limit
for i in {1..15}; do
  curl http://localhost:3000/api/test
  echo ""
done

# Check rate limit status
curl http://localhost:3000/admin/rate-limit/::1

# Reset rate limit
curl -X DELETE http://localhost:3000/admin/rate-limit/::1
```

## Response Examples

**Success Response:**
```json
{
  "status": "success",
  "message": "API is working!",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Rate Limit Exceeded:**
```json
{
  "status": "error",
  "message": "Too many requests from this IP, please try again later.",
  "retryAfter": "45 seconds",
  "limit": 10,
  "windowMs": 60000
}
```

## Rate Limit Headers

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Time when limit resets
- `Retry-After`: Seconds until retry (when limit exceeded)

## License

MIT
```

---

## 🚀 Quick Start Commands

```bash
# 1. Create project directory
mkdir rate-limiter-api && cd rate-limiter-api

# 2. Initialize npm
npm init -y

# 3. Install dependencies
npm install express mongoose dotenv morgan
npm install --save-dev nodemon

# 4. Create folder structure
mkdir -p src/{config,middleware,models,routes,utils}

# 5. Create all files (copy content from above)

# 6. Start MongoDB (in separate terminal)
mongod

# 7. Run the application
npm run dev
```

## 🧪 Testing the Rate Limiter

```bash
# Test 1: Make 15 requests (should block after 10)
for i in {1..15}; do
  echo "Request $i:"
  curl http://localhost:3000/api/test
  echo -e "\n"
done

# Test 2: Check rate limit status
curl http://localhost:3000/admin/rate-limit/::1

# Test 3: Reset rate limit for your IP
curl -X DELETE http://localhost:3000/admin/rate-limit/::1

# Test 4: View all rate limits
curl http://localhost:3000/admin/rate-limits
```

## 📊 Key Features Implemented

1. **In-Memory Storage**: Fast request counting with Map
2. **Automatic Cleanup**: Expired entries removed every minute
3. **IP Detection**: Supports proxies and load balancers
4. **Configurable**: Easy to adjust limits via environment variables
5. **Reset Mechanism**: Admin endpoints to reset individual or all rate limits
6. **Headers**: Standard rate limit headers for client information
7. **MongoDB Integration**: Optional persistence for analytics
8. **Error Handling**: Graceful degradation if DB is unavailable