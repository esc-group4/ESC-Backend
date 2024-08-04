import { all } from '../models/department.js';
import express from 'express';
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        res.json(await all());
    } catch (err) {
        console.error('Error retrieving department: ', err);
        res.status(500).send('Error retrieving department');
    }
});

export { router };