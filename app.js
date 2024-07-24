// app.js
import express from 'express';
import bodyParser from 'body-parser';
import { pool, connectToDatabase, cleanup } from './models/db.js';
import staffRoutes from './routes/staff.js';
import trainingRoutes from './routes/training.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/swaggerConfig.js';

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to connect to the database on startup
app.use(async (req, res, next) => {
  if (!pool.connected) {
    try {
      await connectToDatabase();
    } catch (err) {
      console.error('Database connection error: ', err);
      return res.status(500).send('Database connection error');
    }
  }
  next();
});

// Use the routes
app.use('/staff', staffRoutes);
app.use('/training', trainingRoutes);

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Cleanup on shutdown
process.on('SIGINT', async () => {
  console.log('Closing database connection pool');
  await cleanup();
  process.exit(0);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
