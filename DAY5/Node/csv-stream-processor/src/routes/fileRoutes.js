const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter - only allow CSV files
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;
  
  if (ext === '.csv' || mimeType === 'text/csv' || mimeType === 'application/vnd.ms-excel') {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Routes
router.post('/upload', upload.single('file'), fileController.upload);
router.post('/process/:jobId', fileController.process);
router.get('/status/:jobId', fileController.getStatus);
router.get('/jobs', fileController.listJobs);

module.exports = router;