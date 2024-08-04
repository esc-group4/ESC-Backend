import express from 'express';
// import { getAllStaff, getStaff, insertStaff} from './models/staff.js';

import cors from "cors"; // Add this to the list of imports
import dotenv from "dotenv"; // Add to import list
// import { verifyToken } from './middleware/verifyToken.js';

import { cleanup } from './models/db.js';
import { sync } from './models/department.js';

sync();

// import { getAllCourses } from './models/course.js'; // Adjust the path as needed
// import { getCoursesByEmail } from './models/course.js'; // Adjust the path as needed
// import { updateCourseStatus } from './models/course.js'; // Adjust the path as needed

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import { router as departmentRouter } from './routes/department.js';
app.use('/department', departmentRouter);

// Get all courses
// app.get('/courses', (req, res) => {
//   res.json(getAllCourses());
// });

// app.get('/courses/:email', (req, res) => {
//   const email = req.params.email;
//   const userCourses = getCoursesByEmail(email);

//   if (userCourses.length === 0) {
//     return res.status(404).json({ message: 'No courses found for this user' });
//   }

//   res.json(userCourses);
// });

// app.put('/courses/:id/status', (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const updatedCourse = updateCourseStatus(parseInt(id), status);
//   if (updatedCourse) {
//     res.json(updatedCourse);
//   } else {
//     res.status(404).send('Course not found');
//   }
// });


// Middleware to connect to the database on startup
/* app.use(async (req, res, next) => {
  
  try {
    next();
  } catch (err) {
    console.error('Database connection error: ', err);
    res.status(500).send('Database connection error');
  }
}); */
app.get("/", (req, res) => {
  res.send("working fine");
});

const dummyUserData = {
  id: 1,
  firebase_uid: "abc123",
  name: "Javier Tan",
  email: "javiertan@tsh.com",
  role: "Engineering Manager",
  department: "employee",

};

// app.post('/verifyToken', verifyToken, async (req, res) => {
//   const uid = req.user.uid;
//   try {
//     /* const [rows] = await db.execute('SELECT * FROM users WHERE firebase_uid = ?', [uid]);

//     if (rows.length === 0) {
//       return res.status(404).send('User not found');
//     }
//     const user = rows[0];
//     res.json(user); */
//     console.log(`Received UID: ${uid}`);
//     res.json(dummyUserData);
//   } catch (error) {
//     console.error('Error querying the database:', error);
//     res.status(500).json({ message: "Internal Error" });
//   }
// });

// Route to get all staff
app.get('/staff', async (req, res) => {
  try {
    const staffs = await getAllStaff();
    res.json(staffs);
  } catch (err) {
    console.error('Error retrieving staff: ', err);
    res.status(500).send('Error retrieving staff');
  }
});

app.get('/staff/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await getStaff(id);
    res.send(staff);
  } catch (err) {
    console.error('Error retrieving staff id: ', err);
    res.status(500).send('Error retrieving staff id');
  }
});

// Route to insert a new staff member
app.post('/staff', async (req, res) => {
  try {
    const newStaff = req.body;
    const insertedStaff = await insertStaff(newStaff);
    res.status(201).json(insertedStaff);
  } catch (err) {
    console.error('Error inserting staff: ', err);
    res.status(500).send('Error inserting staff');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});