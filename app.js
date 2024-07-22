import express from 'express';
import cors from "cors"; 
import dotenv from "dotenv"; 
import { courseRoute } from './routes/course.js'
import { tokenRoute } from './routes/token.js'

import { staffsync } from './models/staff.js'
import { cleanup } from './models/db.js'


const app = express();
staffsync()
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/course', courseRoute);
//app.use('/staff', staffRoute);
app.use('/token', tokenRoute);




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

process.on('SIGTERM', async () => {
  console.log('Closing database connection pool');
  await cleanup();
  process.exit(0);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
