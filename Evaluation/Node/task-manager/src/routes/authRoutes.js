const express = require('express');
const {gennerateApiKeyController} = require('../controllers/authController');

const router = express.Router();

router.post("/generate-api", gennerateApiKeyController);
module.exports = router;