const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');


const authRoutes = require('./routes/authRoute');



dotenv.config({ path: 'config.env' });
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');

// Connect with db
dbConnection();



// express app
const app = express();


app.use('/api/v1/auth', authRoutes);

// Middlewares
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));
// i Just want to do this in the development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}



// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8100;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
