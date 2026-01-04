const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');
const FileEvent = require('../models/FileEvent');

class FileWatcher extends EventEmitter {
  constructor(watchDirectory) {
    super();
    this.watchDirectory = watchDirectory;
    this.watcher = null;
    this.fileStats = new Map();
    this.debounceTimers = new Map();
    this.setupListeners();
  }

  setupListeners() {
    // Listen to custom events
    this.on('file:added', this.handleFileAdded.bind(this));
    this.on('file:modified', this.handleFileModified.bind(this));
    this.on('file:deleted', this.handleFileDeleted.bind(this));
    this.on('file:renamed', this.handleFileRenamed.bind(this));
    this.on('error', this.handleError.bind(this));
  }

  async handleFileAdded(data) {
    const timestamp = new Date().toISOString();
    console.log(`✅ [${timestamp}] FILE ADDED: ${data.fileName}`);
    
    try {
      await FileEvent.create({
        eventType: 'added',
        fileName: data.fileName,
        filePath: data.filePath,
        fileSize: data.fileSize,
        timestamp: new Date(),
        details: `File created with size ${data.fileSize} bytes`
      });
    } catch (error) {
      console.error('Error saving file added event:', error);
    }
  }

  async handleFileModified(data) {
    const timestamp = new Date().toISOString();
    console.log(`📝 [${timestamp}] FILE MODIFIED: ${data.fileName}`);
    
    try {
      await FileEvent.create({
        eventType: 'modified',
        fileName: data.fileName,
        filePath: data.filePath,
        fileSize: data.fileSize,
        timestamp: new Date(),
        details: `File modified, current size ${data.fileSize} bytes`
      });
    } catch (error) {
      console.error('Error saving file modified event:', error);
    }
  }

  async handleFileDeleted(data) {
    const timestamp = new Date().toISOString();
    console.log(`🗑️  [${timestamp}] FILE DELETED: ${data.fileName}`);
    
    try {
      await FileEvent.create({
        eventType: 'deleted',
        fileName: data.fileName,
        filePath: data.filePath,
        timestamp: new Date(),
        details: 'File deleted from watched directory'
      });
    } catch (error) {
      console.error('Error saving file deleted event:', error);
    }
  }

  async handleFileRenamed(data) {
    const timestamp = new Date().toISOString();
    console.log(`🔄 [${timestamp}] FILE RENAMED: ${data.oldName} → ${data.newName}`);
    
    try {
      await FileEvent.create({
        eventType: 'renamed',
        fileName: data.newName,
        filePath: data.newPath,
        timestamp: new Date(),
        details: `Renamed from ${data.oldName}`
      });
    } catch (error) {
      console.error('Error saving file renamed event:', error);
    }
  }

  handleError(error) {
    const timestamp = new Date().toISOString();
    console.error(`❌ [${timestamp}] ERROR:`, error.message);
  }

  debounce(key, callback, delay = 100) {
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key));
    }
    
    const timer = setTimeout(() => {
      callback();
      this.debounceTimers.delete(key);
    }, delay);
    
    this.debounceTimers.set(key, timer);
  }

  async initializeFileStats() {
    try {
      const files = await fs.promises.readdir(this.watchDirectory);
      
      for (const file of files) {
        if (file === '.gitkeep') continue;
        
        const filePath = path.join(this.watchDirectory, file);
        try {
          const stats = await fs.promises.stat(filePath);
          if (stats.isFile()) {
            this.fileStats.set(filePath, {
              size: stats.size,
              mtime: stats.mtimeMs
            });
          }
        } catch (err) {
          console.error(`Error reading file stats for ${file}:`, err.message);
        }
      }
      
      console.log(`📊 Initialized stats for ${this.fileStats.size} files`);
    } catch (error) {
      console.error('Error initializing file stats:', error.message);
    }
  }

  async detectChanges(fileName, filePath) {
    try {
      const stats = await fs.promises.stat(filePath);
      
      if (!stats.isFile()) return;
      
      const previousStats = this.fileStats.get(filePath);
      
      if (!previousStats) {
        // New file
        this.emit('file:added', {
          fileName,
          filePath,
          fileSize: stats.size
        });
        this.fileStats.set(filePath, {
          size: stats.size,
          mtime: stats.mtimeMs
        });
      } else if (previousStats.mtime !== stats.mtimeMs || previousStats.size !== stats.size) {
        // Modified file
        this.emit('file:modified', {
          fileName,
          filePath,
          fileSize: stats.size,
          previousSize: previousStats.size
        });
        this.fileStats.set(filePath, {
          size: stats.size,
          mtime: stats.mtimeMs
        });
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File was deleted
        const previousStats = this.fileStats.get(filePath);
        if (previousStats) {
          this.emit('file:deleted', {
            fileName,
            filePath
          });
          this.fileStats.delete(filePath);
        }
      } else {
        this.emit('error', error);
      }
    }
  }

  start() {
    // Create watched directory if it doesn't exist
    if (!fs.existsSync(this.watchDirectory)) {
      fs.mkdirSync(this.watchDirectory, { recursive: true });
      console.log(`📁 Created watch directory: ${this.watchDirectory}`);
    }

    // Initialize file stats
    this.initializeFileStats();

    try {
      this.watcher = fs.watch(this.watchDirectory, { recursive: false }, (eventType, fileName) => {
        if (!fileName || fileName === '.gitkeep') return;

        const filePath = path.join(this.watchDirectory, fileName);
        
        // Debounce to avoid multiple rapid fire events
        this.debounce(`${eventType}-${fileName}`, () => {
          this.detectChanges(fileName, filePath);
        }, 100);
      });

      console.log(`👀 File watcher started on: ${this.watchDirectory}`);
      console.log('📢 Listening for file changes...\n');

    } catch (error) {
      console.error('❌ Error starting file watcher:', error.message);
      this.emit('error', error);
    }
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
      this.fileStats.clear();
      this.debounceTimers.forEach(timer => clearTimeout(timer));
      this.debounceTimers.clear();
      console.log('🛑 File watcher stopped');
    }
  }
}

module.exports = FileWatcher;