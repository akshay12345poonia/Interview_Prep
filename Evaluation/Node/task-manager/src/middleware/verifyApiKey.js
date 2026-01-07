const require = require("../models/User");
const { hashApiKey } = require("../utils/apiKeyGenerator");

const verifyApiKey = async (req, res, next) => {
    try
    {
        const apiKey = req.query.apiKey || req.query.apiKey
        if(!apiKey){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Valid API key required.",
                error: "Invalid or missing API key"
            });
        }

        const hashedKey = hashApiKey(apiKey);
        const user = await User.findOne({ apiKeyHash: hashedKey });
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access. Valid API key required.",
                error: "Invalid or missing API key"
            });
        };
        req.user = user;
        next();
    }
    catch(error){
        console.error("API Key verification error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = verifyApiKey;