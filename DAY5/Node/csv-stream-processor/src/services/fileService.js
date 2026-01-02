const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const csv = require('csv-parser');
const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('stream');
const ProcessJob = require('../models/ProcessJob');

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'outputs';

// Ensure directories exist
[UPLOAD_DIR, OUTPUT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

/**
 * Upload file and create job entry
 */
exports.uploadFile = async (file) => {
  const jobId = uuidv4();
  const inputFilePath = file.path;

  const job = new ProcessJob({
    jobId,
    originalFileName: file.originalname,
    inputFilePath,
    status: 'pending'
  });

  await job.save();
  console.log(`✅ Job created: ${jobId}`);

  return {
    jobId,
    fileName: file.originalname
  };
};

/**
 * Count total lines in file for progress calculation
 */
const countLines = (filePath) => {
  return new Promise((resolve, reject) => {
    let lineCount = 0;
    const stream = createReadStream(filePath);
    
    stream.on('data', (chunk) => {
      for (let i = 0; i < chunk.length; i++) {
        if (chunk[i] === 10) lineCount++; // newline character
      }
    });
    
    stream.on('end', () => resolve(lineCount));
    stream.on('error', reject);
  });
};

/**
 * Process CSV file with streams
 */
exports.processFile = async (jobId) => {
  const job = await ProcessJob.findOne({ jobId });
  
  if (!job) {
    throw new Error('Job not found');
  }

  if (job.status === 'processing') {
    throw new Error('Job is already being processed');
  }

  if (job.status === 'completed') {
    throw new Error('Job has already been completed');
  }

  try {
    // Update job status to processing
    job.status = 'processing';
    job.startedAt = new Date();
    await job.save();
    console.log(`🔄 Processing started for job: ${jobId}`);

    // Count total lines for progress tracking
    const totalLines = await countLines(job.inputFilePath);
    job.totalLines = totalLines;
    await job.save();
    console.log(`📊 Total lines to process: ${totalLines}`);

    const outputFilePath = path.join(OUTPUT_DIR, `processed_${jobId}.csv`);
    let processedLines = 0;
    let headers = [];
    let isFirstRow = true;

    // Transform stream to process each row
    const transformStream = new Transform({
      objectMode: true,
      transform(row, encoding, callback) {
        try {
          // Process: Convert all values to uppercase
          const processedRow = {};
          Object.keys(row).forEach(key => {
            processedRow[key] = row[key].toString().toUpperCase();
          });

          // Write header on first row
          if (isFirstRow) {
            headers = Object.keys(processedRow);
            this.push(headers.join(',') + '\n');
            isFirstRow = false;
          }
          
          // Write data row
          const values = headers.map(header => {
            const value = processedRow[header] || '';
            // Escape values containing commas or quotes
            if (value.includes(',') || value.includes('"')) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          });
          this.push(values.join(',') + '\n');

          processedLines++;
          
          // Update progress every 100 lines to reduce DB writes
          if (processedLines % 100 === 0 || processedLines === totalLines) {
            const progress = Math.floor((processedLines / totalLines) * 100);
            ProcessJob.findOneAndUpdate(
              { jobId },
              { 
                processedLines, 
                progress: Math.min(progress, 100)
              }
            ).catch(err => console.error('Progress update error:', err));
          }

          callback();
        } catch (error) {
          callback(error);
        }
      }
    });

    // Create pipeline: Read → Parse CSV → Transform → Write
    const readStream = createReadStream(job.inputFilePath);
    const writeStream = createWriteStream(outputFilePath);

    await new Promise((resolve, reject) => {
      readStream
        .pipe(csv())
        .pipe(transformStream)
        .pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    // Update job as completed
    job.status = 'completed';
    job.progress = 100;
    job.processedLines = processedLines;
    job.outputFilePath = outputFilePath;
    job.completedAt = new Date();
    await job.save();

    console.log(`✅ Processing completed for job: ${jobId}`);
    console.log(`📝 Processed ${processedLines} lines`);

    return job;
  } catch (error) {
    // Update job as failed
    job.status = 'failed';
    job.error = error.message;
    await job.save();
    
    console.error(`❌ Processing failed for job: ${jobId}`, error.message);
    throw error;
  }
};

/**
 * Get job status
 */
exports.getJobStatus = async (jobId) => {
  const job = await ProcessJob.findOne({ jobId });
  
  if (!job) {
    return null;
  }

  const processingTime = job.completedAt && job.startedAt 
    ? Math.round((job.completedAt - job.startedAt) / 1000) 
    : null;

  return {
    jobId: job.jobId,
    fileName: job.originalFileName,
    status: job.status,
    progress: job.progress,
    totalLines: job.totalLines,
    processedLines: job.processedLines,
    error: job.error,
    startedAt: job.startedAt,
    completedAt: job.completedAt,
    processingTimeSeconds: processingTime,
    outputFile: job.outputFilePath ? path.basename(job.outputFilePath) : null,
    createdAt: job.createdAt
  };
};

/**
 * Get all jobs (last 50)
 */
exports.getAllJobs = async () => {
  const jobs = await ProcessJob.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .select('jobId originalFileName status progress createdAt completedAt');
  
  return jobs.map(job => ({
    jobId: job.jobId,
    fileName: job.originalFileName,
    status: job.status,
    progress: job.progress,
    createdAt: job.createdAt,
    completedAt: job.completedAt
  }));
};