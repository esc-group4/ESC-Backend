import { all } from '../models/department.js';
import express from 'express';
const router = express.Router();

// Route to get all staff
router.get('/all', async (req, res) => {
    try {
        res.json(await all());
    } catch (err) {
        console.error('Error retrieving staff: ', err);
        res.status(500).send('Error retrieving staff');
    }
});

export { router };