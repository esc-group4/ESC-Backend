import express from 'express';
import { getAllStaff, getStaff, insertStaff} from './models/staff.js';
import { connectToDatabase, cleanup } from './models/db.js'; // Assuming db connection functions are in db.js
import cors from "cors"; // Add this to the list of imports
import dotenv from "dotenv"; // Add to import list
import { verifyToken } from './middleware/verifyToken.js';


const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// Middleware to connect to the database on startup
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error('Database connection error: ', err);
    res.status(500).send('Database connection error');
  }
});

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
