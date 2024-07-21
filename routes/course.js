import { getAllCourses } from './models/course.js'; 


app.get('/courses', (req, res) => {
    res.json(getAllCourses());
  });