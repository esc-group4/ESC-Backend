import express from 'express';
import { getAllCourses } from './models/course.js'; 
import { getCoursesByEmail } from './models/course.js'; 
import { updateCourseStatus } from './models/course.js'; 

var router = express.Router();

router.get('/', (req, res) => {
    console.log("COURSES ASKED")
    res.json(getAllCourses());
  });

router.get('/:email', (req, res) => {
  console.log("Getting courses by email");
  const email = req.params.email;
  const userCourses = getCoursesByEmail(email);

  if (userCourses.length === 0) {
    return res.status(404).json({ message: 'No courses found for this user' });
  }

  res.json(userCourses);
});

router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedCourse = updateCourseStatus(parseInt(id), status);
  if (updatedCourse) {
    res.json(updatedCourse);
  } else {
    res.status(404).send('Course not found');
  }
});

export { router };