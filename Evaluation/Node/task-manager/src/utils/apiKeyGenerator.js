const crypto = require('crypto');

const generateApiKey = () => {
    const randomString = crypto.randomBytes(16).toString('hex');
    return `ak_${randomString}`;
};

const hashApiKey = (apiKey) => {
    return crypto.createHash('sha256').update(apiKey).digest('hex');
}

module.exports = {
    generateApiKey,
    hashApiKey
};