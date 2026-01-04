const FileEvent = require('../models/FileEvent');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const { limit = 50, skip = 0, sort = '-timestamp' } = req.query;
    
    const events = await FileEvent.find()
      .sort(sort)
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await FileEvent.countDocuments();
    
    res.json({
      success: true,
      count: events.length,
      total,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await FileEvent.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get events by type
exports.getEventsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { limit = 50 } = req.query;
    
    const events = await FileEvent.find({ eventType: type })
      .sort('-timestamp')
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get event statistics
exports.getEventStats = async (req, res) => {
  try {
    const stats = await FileEvent.aggregate([
      {
        $group: {
          _id: '$eventType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const total = await FileEvent.countDocuments();
    
    res.json({
      success: true,
      total,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Clear all events
exports.clearEvents = async (req, res) => {
  try {
    const result = await FileEvent.deleteMany({});
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} events`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};