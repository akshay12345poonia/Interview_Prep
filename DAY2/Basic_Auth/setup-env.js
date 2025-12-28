const crypto = require('crypto');

// Generate a 256-bit (32-byte) secret
const secret = crypto.randomBytes(32).toString('hex');
console.log('Your JWT_SECRET:');
console.log(secret);