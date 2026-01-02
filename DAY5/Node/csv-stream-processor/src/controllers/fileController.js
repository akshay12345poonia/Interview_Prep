const { 
  uploadFile, 
  processFile, 
  getJobStatus, 
  getAllJobs 
} = require('../services/fileService');

/**
 * Upload CSV file
 * POST /api/files/upload
 */
exports.upload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded. Please attach a CSV file.' 
      });
    }

    const result = await uploadFile(req.file);
    
    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        jobId: result.jobId,
        fileName: result.fileName
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Start processing uploaded file
 * POST /api/files/process/:jobId
 */
exports.process = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    
    if (!jobId) {
      return res.status(400).json({ 
        success: false,
        error: 'Job ID is required' 
      });
    }

    // Start processing asynchronously (don't wait for completion)
    processFile(jobId).catch(err => {
      console.error('❌ Processing error for job:', jobId, err.message);
    });

    res.json({
      success: true,
      message: 'File processing started',
      data: {
        jobId: jobId,
        statusUrl: `/api/files/status/${jobId}`
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get job status and progress
 * GET /api/files/status/:jobId
 */
exports.getStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const status = await getJobStatus(jobId);

    if (!status) {
      return res.status(404).json({ 
        success: false,
        error: 'Job not found' 
      });
    }

    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all jobs
 * GET /api/files/jobs
 */
exports.listJobs = async (req, res, next) => {
  try {
    const jobs = await getAllJobs();
    
    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};