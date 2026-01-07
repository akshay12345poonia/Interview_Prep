const validator = require('validator');

const validateEmail = (email) => {
    return validator.isEmail(email);
};

const validateTaskStatus = (status) => {
    const validStatuses = ['todo', 'in-progress', 'completed'];
    return validStatuses.includes(status);
}

const validatePriority = (priority) => {
    const validPriorities = ['low', 'medium', 'high', 'critical'];
    return validPriorities.includes(priority);
};

const validateDate = (date) => {
    if(!dateString) return true
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

const sanitizeInput = (input) => {
    if(typeof input === 'string') {
        return validator.escape(validator.trim(input));
    }
    return input;
}

module.exports = {
    validateEmail,
    validateTaskStatus,
    validatePriority,
    validateDate,
    sanitizeInput
};