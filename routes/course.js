import { all, byStaffId } from '../models/course.js';
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

router.get('/staff/:id', async (req, res) => {
    const { id } = req.params;
    try {
        res.json(await byStaffId(id));
    } catch (err) {
        console.error('Error retrieving course: ', err);
        res.status(500).send('Error retrieving course');
    }
});

export { router };