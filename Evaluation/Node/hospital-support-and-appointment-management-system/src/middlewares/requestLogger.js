
const morgan = require('morgan');

const requestLogger = (app) => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Concise output colored by response status
  } else {
    app.use(morgan('combined')); // Standard Apache combined log output
  }
};

module.exports = requestLogger;