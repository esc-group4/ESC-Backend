import express from 'express';
import { getAllStaff, getStaff, insertStaff} from './models/staff.js';
import { connectToDatabase, cleanup } from './models/db.js'; // Assuming db connection functions are in db.js
import cors from "cors"; // Add this to the list of imports
import dotenv from "dotenv"; // Add to import list
import { verifyToken } from './middleware/verifyToken.js';

import { getAllCourses } from './models/course.js'; // Adjust the path as needed



const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get all courses
app.get('/courses', (req, res) => {
  res.json(getAllCourses());
});


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

app.get("/", (req, res) => {
  res.send("working fine");
});


const dummyUserData1 = {
  id: 1,
  firebase_uid: "asdasdads",
  name: "Jim",
  email: "jim@example.com",
  role: "CNC Machine Operator"
};

const dummyUserData2 = {
  id: 2,
  firebase_uid: "abc123",
  name: "Michael",
  email: "michael@Mayer.com",
  role: "HOD Machining"
};

const dummyUserData3 = {
  id: 1,
  firebase_uid: "abc123",
  name: "Toby",
  email: "toby@example.com",
  role: "HR Admin"
};


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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

