/**
 * Sanitizes the user object to remove sensitive data before sending response.
 * @param {Object} user - The user document
 * @returns {Object} - Sanitized user object
 */
const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  
  // Remove sensitive fields
  delete userObj.password;
  delete userObj.__v;
  
  // Format dates for better readability (optional)
  if (userObj.createdAt) {
    userObj.createdAt = new Date(userObj.createdAt).toISOString().split('T')[0];
  }

  return userObj;
};

/**
 * Formats a date object into a readable string (YYYY-MM-DD HH:mm).
 * @param {Date} date
 * @returns {string}
 */
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().replace('T', ' ').substring(0, 16);
};

/**
 * Calculates the end time of an appointment based on duration.
 * @param {Date} startDate 
 * @param {number} durationMinutes (default 60)
 * @returns {Date}
 */
const calculateEndTime = (startDate, durationMinutes = 60) => {
  const start = new Date(startDate);
  return new Date(start.getTime() + durationMinutes * 60000);
};

module.exports = {
  sanitizeUser,
  formatDate,
  calculateEndTime,
};