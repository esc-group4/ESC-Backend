import express from 'express';
import { getAllStaff, getStaff, insertStaff} from './models/staff.js';
import { connectToDatabase, cleanup } from './models/db.js'; // Assuming db connection functions are in db.js

const app = express();

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
