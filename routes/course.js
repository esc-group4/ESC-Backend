import { all } from '../models/course.js';
import express from 'express';
var router = express.Router();

router.get('/all', async (req, res) => {
    try {
        res.json(await all());
    } catch (err) {
        console.error('Error retrieving course: ', err);
        res.status(500).send('Error retrieving course');
    }
});

export { router };