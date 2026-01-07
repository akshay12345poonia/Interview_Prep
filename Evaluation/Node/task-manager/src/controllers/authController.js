const User = require("../models/User");
const { generateApiKey, hashApiKey } = require("../utils/apiKeyGenerator");
const {validateEmail} = require("../validators/validators");

const generateApiKeyController = async (req, res) => {
    try 
    {
        const { email } = req.body;
        if(!email){
            return res.status(400).json({
                success: false,
                message: "Email is required",
                error: "Missing email field: email"
            });
        }
        if(!validateEmail(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
                error: "Malformed request body"
            });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "Email already registered. Use existing API key.",
                error: "Duplicate email registration"
            });
        }

        const apiKey = generateApiKey();
        const apiKeyHash = hashApiKey(apiKey);

        const user = new User({
            email,
            apiKey,
            apiKeyHash
        });
        await user.save();

        res.status(201).json({
            success: true,
            message: "API key generated successfully",
            data: {
                email: user.email,
                apiKey: user.apiKey
            }    
        })
    }
    catch (error) {
        console.error("API Key generation error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

module.exports = {
    generateApiKeyController
};