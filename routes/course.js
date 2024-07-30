import { getAllCourses } from './models/course.js'; 


app.get('/courses', (req, res) => {
    res.json(getAllCourses());
  });

app.get('/courses/:email', (req, res) => {
  console.log("Getting courses by email");
  const email = req.params.email;
  const userCourses = getCoursesByEmail(email);

  if (userCourses.length === 0) {
    return res.status(404).json({ message: 'No courses found for this user' });
  }

  res.json(userCourses);
});

app.put('/courses/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedCourse = updateCourseStatus(parseInt(id), status);
  if (updatedCourse) {
    res.json(updatedCourse);
  } else {
    res.status(404).send('Course not found');
  }
});