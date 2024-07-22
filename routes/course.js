import { getAllCourses } from '../models/course.js'; 
import express from 'express';

 var courseRoute = express.Router();

courseRoute.get('/courses', (req, res) => {
    console.log("COURSES ASKED")
    res.json(getAllCourses());
  });

export { courseRoute };