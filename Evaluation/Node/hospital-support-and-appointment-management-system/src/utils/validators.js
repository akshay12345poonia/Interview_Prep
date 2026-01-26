/**
 * Validates if an email is in the correct format.
 * @param {string} email
 * @returns {boolean}
 */
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates password strength (Min 6 chars, at least one number).
 * @param {string} password
 * @returns {boolean}
 */
const validatePassword = (password) => {
  // Example: At least 6 chars, 1 letter, 1 number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return re.test(password);
};

/**
 * Checks if a provided date is in the future.
 * Useful for validating appointment bookings.
 * @param {Date|string} date
 * @returns {boolean}
 */
const isFutureDate = (date) => {
  const today = new Date();
  const inputDate = new Date(date);
  return inputDate > today;
};

/**
 * Validates ObjectId format (MongoDB).
 * @param {string} id
 * @returns {boolean}
 */
const isValidObjectId = (id) => {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  validateEmail,
  validatePassword,
  isFutureDate,
  isValidObjectId,
};